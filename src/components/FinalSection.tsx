import { invitationConfig } from '../config/invitation';
import {
  FloatingParticles,
  Mandala,
  Monogram,
  OrnamentalDivider,
} from './Decorations';
import { Reveal } from './SectionReveal';

export function FinalSection() {
  const { groom, bride } = invitationConfig.couple;

  return (
    <section
      id="final"
      aria-labelledby="final-title"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_top,#8873A8_0%,#493B59_58%,#372B45_100%)] px-8 pt-24 pb-40 text-center"
    >
      <Mandala className="absolute top-1/2 left-1/2 -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-[#D6BD91]/15" />
      <FloatingParticles count={22} />

      <Reveal>
        <Monogram tone="gold" />
        <p className="mx-auto mt-8 max-w-xs font-serif text-2xl leading-snug text-balance text-[#E6E0F2] italic">
          “Every Love Story Is Beautiful, But Ours Is Our Favourite.”
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <OrnamentalDivider className="my-8" />
        <h2 id="final-title" className="flex flex-col items-center">
          <span className="font-script text-6xl leading-[1.2] text-gold-gradient">
            {groom.shortName}
          </span>
          <span className="-my-1 font-script text-3xl leading-[1.2] text-[#E6E0F2]">&amp;</span>
          <span className="font-script text-6xl leading-[1.2] text-gold-gradient">
            {bride.shortName}
          </span>
        </h2>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mx-auto mt-8 max-w-xs text-sm leading-relaxed text-pretty text-[#E6E0F2]/90">
          Together with our families, we look forward to celebrating this beautiful beginning with you.
        </p>
        <p className="mt-10 font-display text-[11px] tracking-[0.35em] text-[#EFE1C6] uppercase">
          {invitationConfig.phrase}
        </p>
        <p className="mt-3 font-display text-xs tracking-[0.3em] text-[#FFFDF8]/75">
          {invitationConfig.event.shortDate}
        </p>
      </Reveal>
    </section>
  );
}
