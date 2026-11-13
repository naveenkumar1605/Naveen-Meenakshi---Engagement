import { invitationConfig } from '../config/invitation';
import { FloralCorner, Mandala, OrnamentalDivider } from './Decorations';
import { Reveal } from './SectionReveal';

export function DressCode() {
  const { dressCode } = invitationConfig;

  return (
    <section
      id="dress-code"
      aria-labelledby="dress-code-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F1FA_0%,#E6E0F2_55%,#F5F1FA_100%)] px-5 py-20"
    >
      <FloralCorner corner="top-left" className="w-40 opacity-65 sm:w-48" />
      <FloralCorner corner="bottom-right" className="w-40 opacity-65 sm:w-48" />
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 text-[#8873A8]/10" />

      <Reveal className="flex flex-col items-center text-center">
        <p className="font-display text-[11px] tracking-[0.35em] text-[#6D588C] uppercase">
          {dressCode.eyebrow}
        </p>
        <h2
          id="dress-code-title"
          className="mt-2 font-serif text-3xl leading-tight font-semibold tracking-[0.14em] text-[#493B59] uppercase sm:text-4xl"
        >
          {dressCode.heading}
        </h2>
        <OrnamentalDivider className="mt-3" />
        <p className="mt-4 max-w-xs font-serif text-lg leading-relaxed text-pretty text-[#493B59]/85 italic">
          {dressCode.subheading}
        </p>
      </Reveal>

      <Reveal className="relative mx-auto mt-10 max-w-sm">
        <div className="relative overflow-hidden rounded-[32px] bg-[#FFFDF8] px-6 py-10 shadow-[0_30px_60px_-30px_rgba(73,59,89,0.5)]">
          <div
            className="pointer-events-none absolute inset-2.5 rounded-[24px] border border-[#D6BD91]/80"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-4 rounded-[20px] border border-[#D6BD91]/35"
            aria-hidden="true"
          />

          <div className="relative text-center">
            <p className="font-display text-[10px] tracking-[0.28em] text-[#6D588C] uppercase">
              Official Dress Code
            </p>
            <p className="mt-2 font-display text-xs leading-relaxed font-semibold tracking-[0.18em] text-[#493B59] uppercase">
              {dressCode.officialPaletteLabel}
            </p>

            {/* Three Color Swatches */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {dressCode.swatches.map((swatch) => (
                <div
                  key={swatch.hex}
                  className="flex flex-col items-center text-center"
                >
                  <div className="rounded-full bg-gold-gradient p-[2px] shadow-[0_10px_22px_-10px_rgba(73,59,89,0.5)]">
                    <div
                      className="size-16 rounded-full border-2 border-[#FFFDF8] sm:size-[70px]"
                      style={{ backgroundColor: swatch.hex }}
                      aria-label={`${swatch.name} color swatch ${swatch.hex}`}
                    />
                  </div>
                  <p className="mt-3 font-serif text-base font-semibold text-[#493B59]">
                    {swatch.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] tracking-wider text-[#6D588C] tabular-nums">
                    {swatch.hex}
                  </p>
                </div>
              ))}
            </div>

            <OrnamentalDivider className="my-8" />

            {/* Outfit Suggestions */}
            <div className="space-y-6 text-left">
              <div className="rounded-2xl border border-[#D8C9E8] bg-[#F5F1FA]/75 p-5">
                <p className="font-display text-[11px] font-semibold tracking-[0.3em] text-[#493B59] uppercase">
                  For Men
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#493B59]/85">
                  {dressCode.suggestions.men.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-[#D6BD91]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#D8C9E8] bg-[#F5F1FA]/75 p-5">
                <p className="font-display text-[11px] font-semibold tracking-[0.3em] text-[#493B59] uppercase">
                  For Women
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#493B59]/85">
                  {dressCode.suggestions.women.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-[#D6BD91]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
