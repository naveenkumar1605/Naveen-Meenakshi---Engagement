import { MapPin, Navigation } from 'lucide-react';
import { invitationConfig } from '../config/invitation';
import { FloatingParticles } from './Decorations';
import { Reveal, SectionHeading } from './SectionReveal';

export function LocationSection() {
  const { venue } = invitationConfig.event;
  const encodedQuery = encodeURIComponent(venue.mapQuery);
  const embedSrc = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

  return (
    <section
      id="location"
      aria-labelledby="location-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#D8C9E8_0%,#8873A8_100%)] px-5 py-20"
    >
      <FloatingParticles count={10} />
      <SectionHeading
        id="location-title"
        eyebrow="The Venue"
        title="Find Your Way to Us"
      />

      <Reveal className="relative mx-auto mt-10 max-w-sm overflow-hidden rounded-[32px] border border-[#D6BD91]/75 bg-[#FFFDF8] p-2.5 shadow-[0_30px_60px_-28px_rgba(55,43,69,0.8)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#E6E0F2]">
          <iframe
            title={`Map showing ${venue.name}`}
            src={embedSrc}
            className="absolute inset-0 size-full border-0 saturate-[0.85]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col items-center px-4 pt-6 pb-5 text-center">
          <span className="relative z-10 -mt-12 flex size-14 items-center justify-center rounded-full bg-gold-gradient text-[#493B59] shadow-lg ring-4 ring-[#FFFDF8]">
            <MapPin className="size-6" aria-hidden="true" />
          </span>

          <h3 className="mt-4 font-serif text-2xl font-semibold text-balance text-[#493B59]">
            {venue.name}
          </h3>
          <p className="mt-0.5 font-serif text-sm text-[#6D588C] italic">
            {venue.shortCity}
          </p>
          <address className="mt-2 text-sm leading-relaxed text-[#493B59]/80 not-italic">
            {venue.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8873A8] px-7 py-3.5 font-display text-xs tracking-[0.25em] text-[#FFFDF8] shadow-[0_12px_24px_-10px_rgba(73,59,89,0.75)] ring-1 ring-[#D6BD91] transition hover:-translate-y-0.5 hover:bg-[#493B59] focus-visible:ring-2 focus-visible:ring-[#493B59] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Navigation className="size-4 text-[#EFE1C6]" aria-hidden="true" />
            GET DIRECTIONS
          </a>
        </div>
      </Reveal>
    </section>
  );
}
