import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, LoaderCircle, Minus, Plus } from 'lucide-react';
import { FloralCorner, OrnamentalDivider } from './Decorations';
import { Reveal, SectionHeading } from './SectionReveal';

interface SavedRsvp {
  name: string;
  attendance: 'accept' | 'decline';
  guests: number;
  message: string;
  submittedAt: string;
}

const RSVP_STORAGE_KEY = 'navmee_rsvp_v1';

const inputClasses =
  'w-full rounded-xl border border-[#D8C9E8] bg-[#FFFDF8] px-4 py-3 text-base text-[#493B59] placeholder:text-[#493B59]/45 transition focus:border-[#8873A8] focus:ring-2 focus:ring-[#8873A8]/25 focus:outline-none aria-invalid:border-[#B4232C]';

export function RsvpForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'accept' | 'decline' | ''>('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; attendance?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<SavedRsvp | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RSVP_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedRsvp;
        setSubmitted(parsed);
        setName(parsed.name);
        setAttendance(parsed.attendance);
        setGuests(parsed.guests || 1);
        setMessage(parsed.message || '');
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; attendance?: string } = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!attendance) {
      nextErrors.attendance = 'Please let us know if you can attend.';
    }
    if (Object.keys(nextErrors).length > 0 || (attendance !== 'accept' && attendance !== 'decline')) {
      setErrors(nextErrors);
      return;
    }

    const selectedAttendance = attendance;
    setErrors({});
    setSubmitting(true);

    window.setTimeout(() => {
      const record: SavedRsvp = {
        name: name.trim(),
        attendance: selectedAttendance,
        guests: selectedAttendance === 'decline' ? 0 : guests,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(record));
      } catch {
        // Ignore storage write errors
      }
      setSubmitted(record);
      setSubmitting(false);
    }, 350);
  };

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden bg-[#FFFDF8] px-5 py-20"
    >
      <FloralCorner corner="top-left" className="w-44 opacity-70" />
      <FloralCorner corner="bottom-right" className="w-44 opacity-70" />

      <SectionHeading
        id="rsvp-title"
        eyebrow="Kindly Respond"
        title="We Would Love to Celebrate With You"
        subtitle="Your presence will make our special day even more memorable."
      />

      <Reveal className="relative mx-auto mt-10 max-w-sm rounded-[32px] border border-[#D6BD91]/70 bg-[#F5F1FA]/85 p-6 shadow-[0_30px_60px_-34px_rgba(73,59,89,0.55)] backdrop-blur-sm">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-6 text-center"
            role="status"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-gold-gradient text-[#493B59] shadow-lg">
              <Heart className="size-7 fill-[#493B59]/20" aria-hidden="true" />
            </span>
            <p className="mt-5 font-script text-4xl text-[#493B59]">
              Thank You, {submitted.name}
            </p>
            <OrnamentalDivider className="my-3" />
            <p className="max-w-xs font-serif text-lg leading-relaxed text-[#493B59]/85 italic">
              {submitted.attendance === 'accept'
                ? `We are overjoyed that you will be celebrating with us${
                    submitted.guests > 1 ? ` (${submitted.guests} guests)` : ''
                  }.`
                : 'You will be missed, and we are grateful for your warm wishes.'}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(null)}
              className="mt-6 rounded-full border border-[#D8C9E8] bg-[#FFFDF8] px-5 py-2 font-display text-[11px] tracking-[0.2em] text-[#493B59] uppercase transition hover:border-[#8873A8]"
            >
              Update Response
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="rsvp-name"
                className="mb-1.5 block font-display text-[10px] tracking-[0.3em] text-[#6D588C] uppercase"
              >
                Guest Name
              </label>
              <input
                id="rsvp-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                className={inputClasses}
              />
              {errors.name && (
                <p id="rsvp-name-error" className="mt-1.5 text-xs text-[#B4232C]">
                  {errors.name}
                </p>
              )}
            </div>

            <fieldset aria-describedby={errors.attendance ? 'rsvp-attendance-error' : undefined}>
              <legend className="mb-1.5 block font-display text-[10px] tracking-[0.3em] text-[#6D588C] uppercase">
                Will You Attend?
              </legend>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { value: 'accept' as const, label: 'Joyfully Accept' },
                  { value: 'decline' as const, label: 'Regretfully Decline' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex min-h-14 cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center font-serif text-base leading-tight transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#8873A8]/40 ${
                      attendance === opt.value
                        ? 'border-[#8873A8] bg-[#8873A8] text-[#FFFDF8] shadow-md'
                        : 'border-[#D8C9E8] bg-[#FFFDF8] text-[#493B59] hover:border-[#8873A8]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={opt.value}
                      checked={attendance === opt.value}
                      onChange={() => setAttendance(opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              {errors.attendance && (
                <p id="rsvp-attendance-error" className="mt-1.5 text-xs text-[#B4232C]">
                  {errors.attendance}
                </p>
              )}
            </fieldset>

            {attendance !== 'decline' && (
              <div>
                <label
                  htmlFor="rsvp-guests"
                  className="mb-1.5 block font-display text-[10px] tracking-[0.3em] text-[#6D588C] uppercase"
                >
                  Number of Guests
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    disabled={guests <= 1}
                    aria-label="Decrease guests"
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#D8C9E8] bg-[#FFFDF8] text-[#493B59] transition hover:border-[#8873A8] disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <input
                    id="rsvp-guests"
                    name="guests"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) =>
                      setGuests(Math.min(10, Math.max(1, Number(e.target.value) || 1)))
                    }
                    className={`${inputClasses} text-center font-serif text-xl font-semibold tabular-nums`}
                  />
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(10, g + 1))}
                    disabled={guests >= 10}
                    aria-label="Increase guests"
                    className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#D8C9E8] bg-[#FFFDF8] text-[#493B59] transition hover:border-[#8873A8] disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="rsvp-message"
                className="mb-1.5 block font-display text-[10px] tracking-[0.3em] text-[#6D588C] uppercase"
              >
                Message{' '}
                <span className="tracking-normal text-[#493B59]/55 normal-case">
                  (optional)
                </span>
              </label>
              <textarea
                id="rsvp-message"
                name="message"
                rows={3}
                maxLength={500}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your blessings for the couple"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#8873A8] px-6 py-4 font-display text-xs tracking-[0.3em] text-[#FFFDF8] shadow-[0_14px_28px_-12px_rgba(73,59,89,0.85)] ring-1 ring-[#D6BD91] transition hover:-translate-y-0.5 hover:bg-[#493B59] disabled:translate-y-0 disabled:opacity-70"
            >
              {submitting && (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              )}
              {submitting ? 'SENDING' : 'SUBMIT RSVP'}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
