import { CalendarHeart, Clock, MapPin, Sparkles } from 'lucide-react';
import { invitationConfig } from '../config/invitation';
import { Mandala, OrnamentalDivider } from './Decorations';
import { Reveal, SectionHeading } from './SectionReveal';

export function EventDetails() {
  const { event } = invitationConfig;

  return (
    <section
      id="event"
      aria-labelledby="event-title"
      className="relative overflow-hidden bg-[#F5F1FA] px-5 py-20"
    >
      <SectionHeading
        id="event-title"
        eyebrow="Save the Date"
        title="The Celebration"
      />

      <Reveal className="relative mx-auto mt-10 max-w-sm">
        <div className="relative overflow-hidden rounded-[32px] bg-[#FFFDF8] px-6 py-12 shadow-[0_30px_60px_-30px_rgba(73,59,89,0.52)]">
          <div
            className="pointer-events-none absolute inset-2.5 rounded-[24px] border border-[#D6BD91]/80"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-4 rounded-[20px] border border-[#D6BD91]/35"
            aria-hidden="true"
          />
          <Mandala className="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 text-[#D8C9E8]/55" />

          <div className="relative flex flex-col gap-8">
            {/* The Occasion */}
            <div className="flex flex-col items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-[#D6BD91] bg-[#E6E0F2]/70 text-[#493B59]">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-display text-[10px] tracking-[0.35em] text-[#6D588C] uppercase">
                The Occasion
              </p>
              <div className="mt-1.5">
                <p className="font-display text-xl tracking-[0.12em] text-[#493B59] uppercase">
                  {event.name}
                </p>
              </div>
            </div>

            <OrnamentalDivider />

            {/* Date & Time */}
            <div className="flex flex-col items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-[#D6BD91] bg-[#E6E0F2]/70 text-[#493B59]">
                <CalendarHeart className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-display text-[10px] tracking-[0.35em] text-[#6D588C] uppercase">
                Date &amp; Time
              </p>
              <div className="mt-1.5">
                <p className="font-serif text-2xl font-semibold text-[#493B59]">
                  <time dateTime="2026-12-06">
                    {event.weekday}, {event.displayDate}
                  </time>
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 font-serif text-base text-[#493B59]/80 italic">
                  <Clock className="size-3.5 text-[#8873A8]" aria-hidden="true" />
                  <span>{event.time}</span>
                </p>
              </div>
            </div>

            <OrnamentalDivider />

            {/* Venue */}
            <div className="flex flex-col items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-[#D6BD91] bg-[#E6E0F2]/70 text-[#493B59]">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-display text-[10px] tracking-[0.35em] text-[#6D588C] uppercase">
                Venue
              </p>
              <div className="mt-1.5">
                <p className="font-serif text-2xl font-semibold text-balance text-[#493B59]">
                  {event.venue.name}
                </p>
                <p className="mt-0.5 font-serif text-base text-[#6D588C] italic">
                  {event.venue.shortCity}
                </p>
                <address className="mt-2 text-sm leading-relaxed text-[#493B59]/80 not-italic">
                  {event.venue.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
