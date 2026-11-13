import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { invitationConfig } from '../config/invitation';
import { ConfigImage } from './ConfigImage';
import {
  FloatingParticles,
  FloralCorner,
  Mandala,
  Monogram,
  OrnamentalDivider,
  WaxSeal,
} from './Decorations';

interface EnvelopeDoorProps {
  side: 'left' | 'right';
  stage: 'closed' | 'opening';
}

function EnvelopeDoor({ side, stage }: EnvelopeDoorProps) {
  const isLeft = side === 'left';

  return (
    <motion.div
      className="absolute top-0 h-full w-1/2 overflow-hidden"
      style={{
        [isLeft ? 'left' : 'right']: 0,
        transformOrigin: isLeft ? 'left center' : 'right center',
        backfaceVisibility: 'hidden',
      }}
      initial={false}
      animate={stage === 'opening' ? { rotateY: isLeft ? -108 : 108 } : { rotateY: 0 }}
      transition={{ duration: 1.15, delay: 0.42, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Seamless 200% background texture across both full-screen doors */}
      <div
        className="absolute inset-0"
        style={{ width: '200%', [isLeft ? 'left' : 'right']: 0 }}
      >
        <ConfigImage
          slot="envelopeBackground"
          asset={invitationConfig.images.envelopeBackground}
          className="scale-105 opacity-70"
          priority
          decorative
        />
        {/* Dusty Lavender -> Deep Lavender satin envelope finish */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(184,165,206,0.88)_0%,rgba(136,115,168,0.86)_52%,rgba(73,59,89,0.92)_100%)]" />
        {/* Subtle envelope crease lines spanning edge-to-edge */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full opacity-35"
          aria-hidden="true"
        >
          <line x1="0" y1="0" x2="50" y2="50" stroke="#D6BD91" strokeWidth="0.22" />
          <line x1="100" y1="0" x2="50" y2="50" stroke="#D6BD91" strokeWidth="0.22" />
          <line x1="0" y1="100" x2="50" y2="50" stroke="#D6BD91" strokeWidth="0.18" />
          <line x1="100" y1="100" x2="50" y2="50" stroke="#D6BD91" strokeWidth="0.18" />
        </svg>
      </div>

      {/* Inner champagne-gold foil frame along outer perimeter of the full-screen envelope */}
      <div
        className="pointer-events-none absolute inset-3 border border-[#D6BD91]/70 sm:inset-6"
        style={{
          [isLeft ? 'borderRight' : 'borderLeft']: 'none',
        }}
      />
      <div
        className="pointer-events-none absolute inset-5 border border-[#D6BD91]/30 sm:inset-8"
        style={{
          [isLeft ? 'borderRight' : 'borderLeft']: 'none',
        }}
      />

      {/* Corner botanical florals anchored on each flap */}
      {isLeft ? (
        <FloralCorner corner="top-left" className="w-44 opacity-55 sm:w-64" />
      ) : (
        <FloralCorner corner="bottom-right" className="w-44 opacity-55 sm:w-64" />
      )}

      {/* Center seam trim */}
      <div
        className={`absolute top-0 h-full w-px bg-[#D6BD91]/70 shadow-[0_0_12px_rgba(214,189,145,0.65)] ${
          isLeft ? 'right-0' : 'left-0'
        }`}
      />
    </motion.div>
  );
}

export function EnvelopeOverlay({
  onOpen,
  onOpeningStart,
}: {
  onOpen: () => void;
  onOpeningStart?: () => void;
}) {
  const [stage, setStage] = useState<'closed' | 'opening'>('closed');
  const { groom, bride } = invitationConfig.couple;

  // Prevent accidental scrolling while the full-screen envelope is visible
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleOpen = () => {
    if (stage !== 'closed') return;
    onOpeningStart?.();
    setStage('opening');
    window.setTimeout(onOpen, 1850);
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 h-screen min-h-[100svh] w-screen overflow-hidden select-none"
      exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
      aria-label="Closed engagement invitation"
    >
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Tap to Open Invitation"
        className="group relative block size-full cursor-pointer text-left focus-visible:outline-none"
        style={{ perspective: '1800px' }}
      >
        {/* Inner Unfolding Warm-Ivory & Soft-Lavender Invitation Layer (revealed as doors swing wide) */}
        <motion.div
          className="absolute inset-0 overflow-hidden bg-[linear-gradient(160deg,#FFFDF8_0%,#E6E0F2_55%,#D8C9E8_100%)]"
          initial={{ scale: 0.96 }}
          animate={stage === 'opening' ? { scale: [0.96, 1, 1.02] } : { scale: 0.96 }}
          transition={{ duration: 1.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-4 rounded-[28px] border border-[#D6BD91]/75 sm:inset-8" />
          <div className="pointer-events-none absolute inset-6 rounded-[24px] border border-[#D6BD91]/35 sm:inset-10" />
          <Mandala className="pointer-events-none absolute top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-[#8873A8]/15 sm:size-[680px]" />
          <FloralCorner corner="top-left" className="w-48 opacity-75 sm:w-64" />
          <FloralCorner corner="bottom-right" className="w-48 opacity-75 sm:w-64" />

          <div className="relative flex size-full flex-col items-center justify-center px-6 text-center">
            <Monogram tone="plum" className="mb-4" />
            <p className="font-display text-[11px] tracking-[0.4em] text-[#6D588C] uppercase sm:text-xs">
              You are cordially invited
            </p>
            <p className="mt-5 px-3 font-script text-6xl leading-[1.2] text-[#493B59] sm:text-7xl">
              {groom.shortName}
            </p>
            <p className="-my-1 font-script text-3xl leading-[1.2] text-[#B5955E] sm:text-4xl">&amp;</p>
            <p className="px-3 font-script text-6xl leading-[1.2] text-[#493B59] sm:text-7xl">
              {bride.shortName}
            </p>
            <OrnamentalDivider className="my-5" />
            <p className="font-display text-xs tracking-[0.35em] text-[#493B59]/85 uppercase sm:text-sm">
              {invitationConfig.event.displayDate} · {invitationConfig.event.time}
            </p>
          </div>
        </motion.div>

        {/* Full-Screen Bi-Fold Envelope Doors */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <EnvelopeDoor side="left" stage={stage} />
          <EnvelopeDoor side="right" stage={stage} />
        </div>

        {/* Floating Champagne Particles over Envelope */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={stage === 'opening' ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <FloatingParticles count={22} />
        </motion.div>

        {/* Closed Envelope Front Branding & Typography */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between px-6 py-10 text-center sm:py-14"
          animate={stage === 'opening' ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top Branding */}
          <div className="flex flex-col items-center pt-2">
            <Monogram tone="gold" />
            <p className="mt-3 font-display text-[11px] tracking-[0.4em] text-[#EFE1C6] uppercase sm:text-xs">
              Engagement Invitation
            </p>
            <p className="mt-2 font-serif text-base tracking-wide text-[#FFFDF8]/90 italic sm:text-lg">
              {invitationConfig.phrase}
            </p>
          </div>

          {/* Spacer for center wax seal */}
          <div className="h-32 sm:h-40" />

          {/* Bottom Couple Names & Tap Prompt */}
          <div className="flex flex-col items-center pb-2">
            <div className="flex flex-col items-center drop-shadow-[0_2px_10px_rgba(49,33,66,0.5)]">
              <p className="font-script text-5xl leading-[1.2] text-gold-gradient sm:text-6xl">
                {groom.shortName}
              </p>
              <p className="-my-1 font-script text-2xl leading-[1.2] text-[#EFE1C6] sm:text-3xl">&amp;</p>
              <p className="font-script text-5xl leading-[1.2] text-gold-gradient sm:text-6xl">
                {bride.shortName}
              </p>
            </div>
            <p className="mt-4 font-display text-[11px] tracking-[0.35em] text-[#EFE1C6]/95 uppercase sm:text-xs">
              {invitationConfig.event.shortDate} · {invitationConfig.event.venue.name}
            </p>

            <motion.p
              className="mt-6 flex items-center gap-3 font-display text-xs tracking-[0.32em] text-[#FFFDF8] uppercase sm:text-sm"
              animate={stage === 'opening' ? { opacity: 0 } : { opacity: [0.6, 1, 0.6] }}
              transition={
                stage === 'opening'
                  ? { duration: 0.25 }
                  : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <span className="h-px w-7 bg-[#D6BD91]" aria-hidden="true" />
              Tap to Open Invitation
              <span className="h-px w-7 bg-[#D6BD91]" aria-hidden="true" />
            </motion.p>
          </div>
        </motion.div>

        {/* Center Champagne-Gold Wax Seal */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={
            stage === 'opening'
              ? { scale: [1, 1.18, 0], opacity: [1, 1, 0], rotate: 28 }
              : { scale: [1, 1.05, 1] }
          }
          transition={
            stage === 'opening'
              ? { duration: 0.55, ease: 'easeIn' }
              : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <WaxSeal size="lg" />
        </motion.div>
      </button>
    </motion.section>
  );
}
