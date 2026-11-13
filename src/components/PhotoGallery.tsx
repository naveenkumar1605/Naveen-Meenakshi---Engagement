import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { invitationConfig } from '../config/invitation';
import { ConfigImage } from './ConfigImage';
import { FloatingParticles, FloralCorner } from './Decorations';
import { Reveal, SectionHeading } from './SectionReveal';

const galleryImages = invitationConfig.images.gallery;

function FeaturedCoupleFrame() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.08]);

  return (
    <Reveal className="relative mx-auto mt-10 w-full max-w-sm">
      <div
        ref={frameRef}
        className="relative rounded-[32px] bg-gold-gradient p-[3px] shadow-[0_30px_60px_-25px_rgba(73,59,89,0.65)]"
      >
        <div className="rounded-[30px] bg-[#FFFDF8] p-2.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <motion.div className="absolute inset-0" style={{ scale }}>
              <ConfigImage
                slot="coupleMain"
                asset={invitationConfig.images.coupleMain}
              />
            </motion.div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#493B59]/85 via-[#493B59]/35 to-transparent px-5 pt-16 pb-5 text-center">
              <p className="font-script text-4xl text-[#FFFDF8]">
                {invitationConfig.couple.groom.shortName} &amp;{' '}
                {invitationConfig.couple.bride.shortName}
              </p>
              <p className="mt-1 font-display text-[10px] tracking-[0.35em] text-[#EFE1C6]">
                {invitationConfig.event.shortDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FloralCorner corner="top-left" className="-top-10 -left-10 w-40 sm:w-44" />
      <FloralCorner corner="bottom-right" className="-right-10 -bottom-10 w-40 sm:w-44" />
    </Reveal>
  );
}

function LightboxModal({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}) {
  const [direction, setDirection] = useState(1);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useCallback(
    (delta: number) => {
      setDirection(delta);
      onNavigate(delta);
    },
    [onNavigate]
  );

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, navigate]);

  const currentAsset = galleryImages[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${galleryImages.length}`}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-[#372B45]/95 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 flex size-11 items-center justify-center rounded-full border border-[#D6BD91]/60 text-[#FFFDF8] transition hover:bg-[#FFFDF8]/10 focus-visible:ring-2 focus-visible:ring-[#D6BD91] focus-visible:outline-none"
        aria-label="Close photo"
      >
        <X className="size-5" />
      </button>

      <div
        className="relative h-[70svh] w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: 80 * dir, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: -80 * dir, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) navigate(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) navigate(-1);
            }}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <ConfigImage
              slot={`gallery.${index}`}
              asset={{ ...currentAsset, fit: 'contain' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="mt-5 flex items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex size-11 items-center justify-center rounded-full border border-[#D6BD91]/60 text-[#EFE1C6] transition hover:bg-[#FFFDF8]/10 focus-visible:ring-2 focus-visible:ring-[#D6BD91] focus-visible:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="min-w-16 text-center font-display text-xs tracking-[0.3em] text-[#E6E0F2] tabular-nums">
          {index + 1} / {galleryImages.length}
        </p>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="flex size-11 items-center justify-center rounded-full border border-[#D6BD91]/60 text-[#EFE1C6] transition hover:bg-[#FFFDF8]/10 focus-visible:ring-2 focus-visible:ring-[#D6BD91] focus-visible:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <p className="mt-3 text-xs text-[#E6E0F2]/70">Swipe to browse</p>
    </motion.div>
  );
}

export function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNavigate = useCallback((delta: number) => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + delta + galleryImages.length) % galleryImages.length
    );
  }, []);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#E6E0F2_0%,#D8C9E8_55%,#E6E0F2_100%)] px-6 py-20"
    >
      <FloatingParticles count={12} />
      <SectionHeading
        id="gallery-title"
        eyebrow="Our Moments"
        title="A Glimpse of Love"
      />

      <FeaturedCoupleFrame />

      {galleryImages.length > 0 && (
        <div className="mx-auto mt-16 grid max-w-sm grid-cols-2 gap-3">
          {galleryImages.map((img, idx) => (
            <Reveal
              key={`${img.src}-${idx}`}
              delay={(idx % 2) * 0.1}
              className={
                idx === 0 && galleryImages.length % 2 === 1 ? 'col-span-2' : ''
              }
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border-2 border-[#FFFDF8] shadow-[0_14px_30px_-16px_rgba(73,59,89,0.55)] ring-1 ring-[#D6BD91]/60 focus-visible:ring-2 focus-visible:ring-[#8873A8] focus-visible:outline-none"
                aria-label={`Open photo: ${img.alt}`}
              >
                <ConfigImage
                  slot={`gallery.${idx}`}
                  asset={img}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-[#493B59]/0 transition group-hover:bg-[#493B59]/25" />
                <span className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-full bg-[#FFFDF8]/90 text-[#493B59] opacity-90 transition group-hover:opacity-100">
                  <Expand className="size-3.5" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedIndex !== null && (
          <LightboxModal
            index={selectedIndex}
            onClose={() => setSelectedIndex(null)}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
