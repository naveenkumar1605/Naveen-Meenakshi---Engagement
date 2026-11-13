import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MusicProvider,
  PhotoOverridesProvider,
  useMusic,
} from './context/InvitationContext';
import { Mandala } from './components/Decorations';
import { EnvelopeOverlay } from './components/EnvelopeOverlay';
import { InvitationCover } from './components/InvitationCover';
import { Countdown } from './components/Countdown';
import { CoupleProfiles } from './components/CoupleProfiles';
import { PhotoGallery } from './components/PhotoGallery';
import { DressCode } from './components/DressCode';
import { EventDetails } from './components/EventDetails';
import { LocationSection } from './components/LocationSection';
import { RsvpForm } from './components/RsvpForm';
import { FinalSection } from './components/FinalSection';
import { BottomNav } from './components/BottomNav';
import { PhotoCustomizer } from './components/PhotoCustomizer';

function InvitationExperience() {
  const [opened, setOpened] = useState(false);
  const { play } = useMusic();

  const handleEnvelopeOpen = () => {
    setOpened(true);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="relative min-h-svh bg-[linear-gradient(135deg,#E6E0F2_0%,#F5F1FA_50%,#D8C9E8_100%)]">
      {/* Flanking Desktop Mandalas */}
      <Mandala className="pointer-events-none fixed top-1/2 -left-64 hidden size-[600px] -translate-y-1/2 animate-spin-slow text-[#8873A8]/12 lg:block" />
      <Mandala className="pointer-events-none fixed top-1/2 -right-64 hidden size-[600px] -translate-y-1/2 animate-spin-slow text-[#8873A8]/12 lg:block" />

      <AnimatePresence>
        {!opened && (
          <EnvelopeOverlay
            key="envelope"
            onOpeningStart={play}
            onOpen={handleEnvelopeOpen}
          />
        )}
      </AnimatePresence>

      {opened && (
        <>
          <motion.main
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[480px] overflow-x-hidden shadow-[0_0_80px_-20px_rgba(73,59,89,0.45)] sm:my-0"
          >
            <InvitationCover />
            <Countdown />
            <CoupleProfiles />
            <PhotoGallery />
            <DressCode />
            <EventDetails />
            <LocationSection />
            <RsvpForm />
            <FinalSection />
          </motion.main>

          <BottomNav />
          <PhotoCustomizer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <PhotoOverridesProvider>
      <MusicProvider>
        <InvitationExperience />
      </MusicProvider>
    </PhotoOverridesProvider>
  );
}
