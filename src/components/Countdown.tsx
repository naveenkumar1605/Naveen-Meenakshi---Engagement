import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { invitationConfig } from '../config/invitation';
import { Mandala } from './Decorations';
import { Reveal, SectionHeading } from './SectionReveal';

const TARGET_TIMESTAMP = new Date(invitationConfig.event.dateISO).getTime();

function CountdownTile({
  value,
  label,
  index,
}: {
  value: number | null;
  label: string;
  index: number;
}) {
  const formatted = value === null ? '--' : String(value).padStart(2, '0');

  return (
    <Reveal delay={0.1 * index} className="flex flex-col items-center">
      <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#D6BD91]/70 bg-[#FFFDF8] shadow-[0_12px_30px_-14px_rgba(73,59,89,0.42)]">
        <div
          className="absolute inset-1 rounded-xl border border-[#D8C9E8]"
          aria-hidden="true"
        />
        <div className="relative h-10 overflow-hidden sm:h-12">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={formatted}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="block font-serif text-4xl leading-10 font-semibold text-[#493B59] tabular-nums sm:text-5xl sm:leading-[3rem]"
            >
              {formatted}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="mt-1 h-px w-6 bg-[#D6BD91]" aria-hidden="true" />
        <span className="mt-2 font-display text-[9px] tracking-[0.25em] text-[#6D588C] uppercase sm:text-[10px]">
          {label}
        </span>
      </div>
    </Reveal>
  );
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = now === null ? null : Math.max(0, TARGET_TIMESTAMP - now);
  const timeLeft =
    diff === null
      ? null
      : {
          done: diff === 0,
          days: Math.floor(diff / 86_400_000),
          hours: Math.floor((diff / 3_600_000) % 24),
          minutes: Math.floor((diff / 60_000) % 60),
          seconds: Math.floor((diff / 1_000) % 60),
        };

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F1FA_0%,#E6E0F2_100%)] px-5 py-20"
    >
      <Mandala className="absolute -right-24 -bottom-24 size-72 text-[#8873A8]/12" />
      <SectionHeading
        id="countdown-title"
        eyebrow="Counting the moments"
        title="Until We Say Forever"
      />

      {timeLeft?.done ? (
        <Reveal className="mx-auto mt-10 max-w-xs rounded-3xl border border-[#D6BD91]/70 bg-[#FFFDF8] p-8 text-center shadow-lg">
          <Heart
            className="mx-auto size-8 fill-[#8873A8]/20 text-[#8873A8]"
            aria-hidden="true"
          />
          <p className="mt-4 font-serif text-2xl text-[#493B59]">
            Our celebration has begun
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#493B59]/75">
            Thank you for being part of our story and for your warm blessings.
          </p>
        </Reveal>
      ) : (
        <div
          className="mx-auto mt-10 grid max-w-sm grid-cols-4 gap-2.5 sm:gap-3"
          role="timer"
          aria-live="off"
        >
          <CountdownTile index={0} value={timeLeft?.days ?? null} label="Days" />
          <CountdownTile index={1} value={timeLeft?.hours ?? null} label="Hours" />
          <CountdownTile index={2} value={timeLeft?.minutes ?? null} label="Minutes" />
          <CountdownTile index={3} value={timeLeft?.seconds ?? null} label="Seconds" />
        </div>
      )}

      <Reveal delay={0.35} className="mt-8 text-center">
        <p className="font-display text-xs tracking-[0.28em] text-[#493B59] uppercase">
          {invitationConfig.event.weekday} · {invitationConfig.event.displayDate} ·{' '}
          {invitationConfig.event.time}
        </p>
      </Reveal>
    </section>
  );
}
