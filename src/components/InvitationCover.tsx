import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { invitationConfig } from '../config/invitation';
import { ConfigImage } from './ConfigImage';
import {
  FloatingParticles,
  Mandala,
  Monogram,
  OrnamentalDivider,
  OrnamentalFrame,
} from './Decorations';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function InvitationCover() {
  const { groom, bride } = invitationConfig.couple;
  const { event } = invitationConfig;

  return (
    <section
      id="home"
      aria-labelledby="cover-title"
      className="relative isolate overflow-hidden px-6 pt-16 pb-14 text-center"
    >
      {/* Background Silk & Mandala Scrim */}
      <div className="absolute inset-0 -z-10">
        <ConfigImage
          slot="coverBackground"
          asset={invitationConfig.images.coverBackground}
          priority
          decorative
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(136,115,168,0.84)_0%,rgba(97,78,122,0.80)_45%,rgba(73,59,89,0.94)_100%)]" />
      </div>

      <Mandala className="absolute -top-28 left-1/2 -z-10 size-[420px] -translate-x-1/2 animate-spin-slow text-[#D6BD91]/18" />
      <OrnamentalFrame />
      <FloatingParticles />

      <motion.div {...fadeUp(0.1)}>
        <Monogram tone="gold" />
      </motion.div>

      <motion.p
        {...fadeUp(0.25)}
        className="mt-5 font-display text-[11px] tracking-[0.4em] text-[#EFE1C6] uppercase"
      >
        You are cordially invited
      </motion.p>

      <motion.h1
        id="cover-title"
        {...fadeUp(0.4)}
        className="mt-4 flex flex-col items-center"
      >
        <span className="font-script text-6xl leading-[1.2] text-gold-gradient sm:text-7xl">
          {groom.shortName}
        </span>
        <span className="-my-1 font-script text-3xl leading-[1.2] text-[#E6E0F2]">&amp;</span>
        <span className="font-script text-6xl leading-[1.2] text-gold-gradient sm:text-7xl">
          {bride.shortName}
        </span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.55)}
        className="mx-auto mt-5 max-w-xs font-serif text-lg leading-relaxed text-pretty text-[#E6E0F2] italic"
      >
        Together with our families, we invite you to celebrate the beginning of our beautiful journey.
      </motion.p>

      {/* Arched Couple Portrait Frame */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-8 w-[min(78vw,290px)]"
      >
        <div className="rounded-t-full rounded-b-[28px] bg-gold-gradient p-[3px] shadow-[0_25px_50px_-15px_rgba(37,25,49,0.75)]">
          <div className="rounded-t-full rounded-b-[26px] bg-[#493B59] p-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[22px]">
              <ConfigImage
                slot="coupleMain"
                asset={invitationConfig.images.coupleMain}
                priority
              />
            </div>
          </div>
        </div>
        <span
          className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rotate-45 border border-[#D6BD91] bg-[#493B59]"
          aria-hidden="true"
        />
      </motion.figure>

      <motion.div {...fadeUp(0.8)} className="mt-10">
        <p className="font-display text-[11px] tracking-[0.35em] text-[#E6E0F2] uppercase">
          {event.name}
        </p>
        <OrnamentalDivider className="my-3" />
        <p className="font-display text-2xl tracking-[0.18em] text-[#FFFDF8] sm:text-3xl">
          <time dateTime="2026-12-06">{event.coverDate}</time>
        </p>
        <p className="mt-1.5 font-display text-xs tracking-[0.28em] text-[#EFE1C6] uppercase">
          {event.time}
        </p>
        <p className="mt-2 font-serif text-base text-[#EFE1C6] italic">
          {event.venue.name}
        </p>
      </motion.div>

      <motion.a
        href="#countdown"
        aria-label="Scroll to countdown"
        className="mx-auto mt-10 flex size-10 items-center justify-center rounded-full border border-[#D6BD91]/70 text-[#EFE1C6] transition hover:bg-[#FFFDF8]/10 focus-visible:ring-2 focus-visible:ring-[#D6BD91] focus-visible:outline-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="size-5" />
      </motion.a>
    </section>
  );
}
