import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ChevronUp, Home, Music, VolumeX } from 'lucide-react';
import { useMusic } from '../context/InvitationContext';

const SECTIONS = [
  'home',
  'countdown',
  'couple',
  'gallery',
  'dress-code',
  'event',
  'location',
  'rsvp',
  'final',
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function MusicEqualizer() {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
      {[0, 0.2, 0.4, 0.1].map((delay, idx) => (
        <span
          key={idx}
          className="w-[3px] animate-[eq_0.9s_ease-in-out_infinite] rounded-full bg-current"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

const iconButtonClass =
  'flex size-11 items-center justify-center rounded-full text-[#E6E0F2] transition hover:bg-[#FFFDF8]/10 hover:text-[#EFE1C6] focus-visible:ring-2 focus-visible:ring-[#D6BD91] focus-visible:outline-none disabled:opacity-35';

export function BottomNav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { playing, trackTitle, trackArtist, toggle } = useMusic();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTIONS.indexOf(entry.target.id as (typeof SECTIONS)[number]);
            if (idx >= 0) setActiveIdx(idx);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const stepSection = (delta: number) => {
    const nextIdx = Math.min(SECTIONS.length - 1, Math.max(0, activeIdx + delta));
    scrollToSection(SECTIONS[nextIdx]);
  };

  return (
    <motion.nav
      aria-label="Invitation navigation"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-40 flex w-[min(calc(100%-1.5rem),400px)] -translate-x-1/2 flex-col items-center gap-1.5"
    >
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none inline-flex items-center gap-1.5 rounded-full border border-[#D6BD91]/45 bg-[#493B59]/88 px-3 py-0.5 text-[10px] tracking-[0.16em] text-[#EFE1C6] shadow-sm backdrop-blur-md"
          >
            <Music className="size-2.5 text-[#D6BD91]" aria-hidden="true" />
            <span className="whitespace-nowrap">
              {trackTitle} · {trackArtist}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full items-center justify-between rounded-full border border-[#D6BD91]/60 bg-[#493B59]/92 px-2 py-1.5 shadow-[0_18px_40px_-12px_rgba(40,20,45,0.75)] backdrop-blur-md">
        <button
          type="button"
          className={iconButtonClass}
          onClick={() => scrollToSection('home')}
          aria-label="Go to top"
        >
          <Home className="size-5" />
        </button>

        <button
          type="button"
          className={iconButtonClass}
          onClick={() => stepSection(-1)}
          disabled={activeIdx === 0}
          aria-label="Previous section"
        >
          <ChevronUp className="size-5" />
        </button>

        <button
          type="button"
          onClick={() => scrollToSection('rsvp')}
          className={`rounded-full bg-gold-gradient px-6 py-2.5 font-display text-xs font-semibold tracking-[0.3em] text-[#372B45] shadow-[0_6px_16px_-6px_rgba(214,189,145,0.9)] transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-[#FFFDF8] focus-visible:outline-none ${
            SECTIONS[activeIdx] === 'rsvp' ? 'ring-2 ring-[#FFFDF8]/75' : ''
          }`}
        >
          RSVP
        </button>

        <button
          type="button"
          className={iconButtonClass}
          onClick={() => stepSection(1)}
          disabled={activeIdx === SECTIONS.length - 1}
          aria-label="Next section"
        >
          <ChevronDown className="size-5" />
        </button>

        <button
          type="button"
          className={`${iconButtonClass} ${playing ? 'text-[#EFE1C6]' : ''}`}
          onClick={toggle}
          aria-label={
            playing
              ? `Pause ${trackTitle} by ${trackArtist}`
              : `Play ${trackTitle} by ${trackArtist}`
          }
          title={`${trackTitle} – ${trackArtist}`}
          aria-pressed={playing}
        >
          {playing ? (
            <MusicEqualizer />
          ) : (
            <span className="relative">
              <Music className="size-5" />
              <VolumeX className="absolute -right-2 -bottom-1.5 size-3" />
            </span>
          )}
        </button>
      </div>
    </motion.nav>
  );
}
