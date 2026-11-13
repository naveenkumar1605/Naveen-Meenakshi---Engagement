import { invitationConfig } from '../config/invitation';
import { ConfigImage } from './ConfigImage';

const PARTICLES = Array.from({ length: 22 }, (_, idx) => ({
  left: (47 * idx + 11) % 100,
  top: (29 * idx + 7) % 100,
  size: 2 + ((13 * idx) % 4),
  delay: ((0.7 * idx) % 9).toFixed(2),
  duration: 7 + ((3 * idx) % 6),
}));

const CORNER_POSITION = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
} as const;

const CORNER_FLIP = {
  'top-left': '',
  'top-right': '-scale-x-100',
  'bottom-left': '-scale-y-100',
  'bottom-right': '-scale-100',
} as const;

export function FloralCorner({
  corner,
  className = '',
}: {
  corner: keyof typeof CORNER_POSITION;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute aspect-[1.85] w-56 mix-blend-multiply sm:w-64 ${CORNER_POSITION[corner]} ${CORNER_FLIP[corner]} ${className}`}
      aria-hidden="true"
    >
      <div className="relative size-full animate-sway">
        <ConfigImage
          slot="floralDecoration"
          asset={invitationConfig.images.floralDecoration}
          decorative
        />
      </div>
    </div>
  );
}

export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-[#D6BD91] ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D6BD91] sm:w-16" />
      <svg viewBox="0 0 40 12" className="h-3 w-10" fill="currentColor">
        <path d="M20 0 L23 6 L20 12 L17 6Z" />
        <circle cx="10" cy="6" r="1.6" />
        <circle cx="30" cy="6" r="1.6" />
        <circle cx="3" cy="6" r="1" />
        <circle cx="37" cy="6" r="1" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D6BD91] sm:w-16" />
    </div>
  );
}

export function OrnamentalFrame({ className = '' }: { className?: string }) {
  const corners = [
    'top-0 left-0',
    'top-0 right-0 rotate-90',
    'bottom-0 right-0 rotate-180',
    'bottom-0 left-0 -rotate-90',
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-3 sm:inset-4 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[28px] border border-[#D6BD91]/75" />
      <div className="absolute inset-1.5 rounded-[24px] border border-[#D6BD91]/40" />
      {corners.map((cornerClass) => (
        <svg
          key={cornerClass}
          viewBox="0 0 40 40"
          className={`absolute size-9 text-[#D6BD91] ${cornerClass}`}
          fill="currentColor"
        >
          <path d="M4 4 Q20 6 22 20 Q8 18 4 4Z" opacity="0.85" />
          <circle cx="26" cy="8" r="1.6" />
          <circle cx="8" cy="26" r="1.6" />
        </svg>
      ))}
    </div>
  );
}

export function FloatingParticles({
  className = '',
  count = 22,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {PARTICLES.slice(0, count).map((p, idx) => (
        <span
          key={idx}
          className="animate-float-slow absolute rounded-full bg-[#EFE1C6] shadow-[0_0_6px_2px_rgba(214,189,145,0.55)]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Mandala({
  className = '',
  strokeWidth = 0.6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <circle r="6" />
      <circle r="20" />
      <circle r="28" strokeDasharray="1.5 2.5" />
      <circle r="74" />
      <circle r="98" strokeOpacity="0.6" />
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={`a${i}`}
          d="M0,-6 C5,-13 5,-19 0,-26 C-5,-19 -5,-13 0,-6Z"
          transform={`rotate(${45 * i})`}
        />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={`b${i}`}
          d="M0,-30 C9,-44 9,-58 0,-72 C-9,-58 -9,-44 0,-30Z"
          transform={`rotate(${22.5 * i})`}
        />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={`c${i}`}
          d="M0,-38 C4,-46 4,-54 0,-62 C-4,-54 -4,-46 0,-38Z"
          transform={`rotate(${22.5 * i})`}
          strokeOpacity="0.7"
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={`d${i}`}
          d="M0,-74 C13,-81 13,-91 0,-97 C-13,-91 -13,-81 0,-74Z"
          transform={`rotate(${30 * i + 15})`}
        />
      ))}
      {Array.from({ length: 24 }, (_, i) => (
        <circle
          key={`e${i}`}
          r="1.4"
          cy="-85"
          transform={`rotate(${15 * i})`}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </svg>
  );
}

export function Monogram({
  className = '',
  tone = 'gold',
}: {
  className?: string;
  tone?: 'gold' | 'plum';
}) {
  const { groom, bride } = invitationConfig.couple;
  return (
    <div
      className={`flex items-center justify-center gap-1.5 font-display text-lg tracking-[0.2em] ${
        tone === 'gold' ? 'text-[#D6BD91]' : 'text-[#493B59]'
      } ${className}`}
      aria-hidden="true"
    >
      <span>{groom.shortName[0]}</span>
      <span className="font-script text-2xl tracking-normal">&amp;</span>
      <span>{bride.shortName[0]}</span>
    </div>
  );
}

export function WaxSeal({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const { groom, bride } = invitationConfig.couple;
  const sizeClass = size === 'lg' ? 'size-28 sm:size-32' : 'size-24';

  return (
    <div
      className={`relative grid ${sizeClass} place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#F5E7C8_0%,#D6BD91_42%,#A88952_78%,#846736_100%)] shadow-[0_12px_30px_rgba(49,33,66,0.55),inset_0_-4px_10px_rgba(90,60,20,0.55),inset_0_3px_6px_rgba(255,248,228,0.65)]`}
    >
      <div className="absolute inset-[7px] rounded-full border border-[#846736]/55" />
      <Mandala className="absolute inset-2.5 text-[#755829]/60" strokeWidth={1.35} />
      <span className="relative font-display text-2xl font-semibold tracking-wider text-[#493B59] drop-shadow-[0_1px_0_rgba(255,245,220,0.65)] sm:text-3xl">
        {groom.shortName[0]}
        <span className="font-script px-0.5 text-xl sm:text-2xl">&amp;</span>
        {bride.shortName[0]}
      </span>
    </div>
  );
}
