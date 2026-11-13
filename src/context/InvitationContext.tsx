import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { invitationConfig } from '../config/invitation';

export interface PhotoOverride {
  src?: string;
  fileName?: string;
  position?: string;
  fit?: 'cover' | 'contain';
}

interface PhotoContextValue {
  overrides: Record<string, PhotoOverride>;
  setOverride: (slot: string, patch: PhotoOverride | null) => void;
  resetAll: () => void;
}

const STORAGE_KEY = 'navmee_photo_overrides_v1';

const PhotoContext = createContext<PhotoContextValue>({
  overrides: {},
  setOverride: () => {},
  resetAll: () => {},
});

export function PhotoOverridesProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, PhotoOverride>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, PhotoOverride>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      // Ignore storage quota errors for large base64 images
    }
  }, [overrides]);

  const setOverride = useCallback((slot: string, patch: PhotoOverride | null) => {
    setOverrides((prev) => {
      const next = { ...prev };
      if (patch === null) {
        delete next[slot];
      } else {
        next[slot] = { ...prev[slot], ...patch };
      }
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  const value = useMemo(
    () => ({ overrides, setOverride, resetAll }),
    [overrides, setOverride, resetAll]
  );

  return <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>;
}

export function usePhotoOverrides() {
  return useContext(PhotoContext);
}

export function useResolvedAsset<T extends { src: string; alt: string; position?: string; fit?: 'cover' | 'contain' }>(
  slot: string | undefined,
  asset: T
): T {
  const { overrides } = usePhotoOverrides();
  const override = slot ? overrides[slot] : undefined;
  return override ? { ...asset, ...override } : asset;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    options: {
      height?: string | number;
      width?: string | number;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface MusicContextValue {
  playing: boolean;
  trackTitle: string;
  trackArtist: string;
  play: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextValue>({
  playing: false,
  trackTitle: invitationConfig.music.title,
  trackArtist: invitationConfig.music.artist,
  play: () => {},
  toggle: () => {},
});

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const ytWrapperRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const ytReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const { youtubeVideoId, volume } = invitationConfig.music;
    const wrapper = ytWrapperRef.current;
    let cancelled = false;

    const initYouTubePlayer = () => {
      if (cancelled || !wrapper || !window.YT?.Player || ytPlayerRef.current) {
        return;
      }

      wrapper.innerHTML = '';
      const playerHost = document.createElement('div');
      wrapper.appendChild(playerHost);

      ytPlayerRef.current = new window.YT.Player(playerHost, {
        width: '1',
        height: '1',
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          loop: 1,
          playlist: youtubeVideoId,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            ytReadyRef.current = true;
            event.target.setVolume(volume);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (cancelled || !window.YT) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setPlaying(false);
            } else if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
          onError: () => {
            if (cancelled) return;
            pendingPlayRef.current = false;
            setPlaying(false);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initYouTubePlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        initYouTubePlayer();
      };
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      ytReadyRef.current = false;
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
      if (wrapper) {
        wrapper.innerHTML = '';
      }
    };
  }, []);

  const play = useCallback(() => {
    if (ytReadyRef.current && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.playVideo();
      } catch {
        setPlaying(false);
      }
      return;
    }

    pendingPlayRef.current = true;
  }, []);

  const pause = useCallback(() => {
    pendingPlayRef.current = false;
    if (ytReadyRef.current && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch {
        // Ignore
      }
    }
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      pause();
    } else {
      play();
    }
  }, [playing, pause, play]);

  const value = useMemo(
    () => ({
      playing,
      trackTitle: invitationConfig.music.title,
      trackArtist: invitationConfig.music.artist,
      play,
      toggle,
    }),
    [playing, play, toggle]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Hidden official YouTube IFrame Player */}
      <div
        ref={ytWrapperRef}
        className="pointer-events-none fixed -bottom-4 -left-4 size-px overflow-hidden opacity-0"
        aria-hidden="true"
      />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
