import { useState } from 'react';
import { ImageAsset } from '../config/invitation';
import { useResolvedAsset } from '../context/InvitationContext';

interface ConfigImageProps {
  asset: ImageAsset;
  slot?: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}

export function ConfigImage({
  asset,
  slot,
  className = '',
  decorative = false,
  priority = false,
}: ConfigImageProps) {
  const resolved = useResolvedAsset(slot, asset);
  const [failed, setFailed] = useState(false);

  if (failed || !resolved.src) {
    return (
      <div
        className={`flex size-full items-center justify-center bg-[linear-gradient(145deg,#E6E0F2_0%,#D8C9E8_55%,#B8A5CE_100%)] text-[#493B59] ${className}`}
        aria-hidden={decorative || undefined}
      >
        {!decorative && (
          <span className="px-4 text-center font-serif text-sm italic opacity-75">
            {resolved.alt || 'Couple Portrait'}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={resolved.src}
      alt={decorative ? '' : resolved.alt}
      aria-hidden={decorative || undefined}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      draggable={false}
      onError={() => setFailed(true)}
      className={`size-full select-none ${className}`}
      style={{
        objectFit: resolved.fit ?? 'cover',
        objectPosition: resolved.position ?? '50% 50%',
      }}
    />
  );
}
