import { invitationConfig } from '../config/invitation';
import { ConfigImage } from './ConfigImage';
import { FloralCorner, OrnamentalDivider } from './Decorations';
import { Reveal, SectionHeading } from './SectionReveal';

function ProfileCard({
  slot,
  person,
  delay,
}: {
  slot: 'groom' | 'bride';
  person: {
    fullName: string;
    role: string;
    description: string;
  };
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="relative flex flex-col items-center text-center">
      <div className="relative">
        <div
          className="absolute -inset-3 rounded-[50%] border border-dashed border-[#D6BD91]/70"
          aria-hidden="true"
        />
        <div className="relative h-56 w-44 rounded-[50%] bg-gold-gradient p-[3px] shadow-[0_20px_40px_-18px_rgba(73,59,89,0.55)]">
          <div className="relative size-full overflow-hidden rounded-[50%] border-4 border-[#FFFDF8] bg-[#E6E0F2]">
            <ConfigImage slot={slot} asset={invitationConfig.images[slot]} />
          </div>
        </div>
      </div>

      <p className="mt-6 font-display text-[10px] tracking-[0.35em] text-[#6D588C] uppercase">
        {person.role}
      </p>
      <h3 className="mt-1 font-serif text-3xl font-semibold text-[#493B59]">
        {person.fullName}
      </h3>
      <OrnamentalDivider className="my-3" />
      <p className="max-w-[17rem] text-sm leading-relaxed text-pretty text-[#493B59]/75">
        {person.description}
      </p>
    </Reveal>
  );
}

export function CoupleProfiles() {
  const { groom, bride } = invitationConfig.couple;

  return (
    <section
      id="couple"
      aria-labelledby="couple-title"
      className="relative overflow-hidden bg-[#FFFDF8] px-6 py-20"
    >
      <FloralCorner corner="top-right" className="w-44 opacity-70 sm:w-52" />
      <FloralCorner corner="bottom-left" className="w-44 opacity-70 sm:w-52" />
      <div
        className="pointer-events-none absolute inset-3 rounded-[28px] border border-[#D8C9E8]"
        aria-hidden="true"
      />

      <SectionHeading
        id="couple-title"
        eyebrow="The Couple"
        title="Two Hearts, One Story"
      />

      <div className="relative mt-12 flex flex-col items-center gap-10">
        <ProfileCard slot="groom" person={groom} delay={0} />
        <Reveal className="font-script text-6xl text-[#D6BD91]" aria-hidden="true">
          &amp;
        </Reveal>
        <ProfileCard slot="bride" person={bride} delay={0.1} />
      </div>
    </section>
  );
}
