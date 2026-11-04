import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX, MapPin, Phone } from 'lucide-react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Hero } from './components/Hero';
import { CoupleDetails } from './components/CoupleDetails';
import { CeremonyDetails } from './components/CeremonyDetails';
import { Location } from './components/Location';
import { Timeline } from './components/Timeline';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { WishesSection } from './components/WishesSection';
import { DecorativeDivider } from './components/DecorativeDivider';
import { Monogram } from './components/Monogram';
import { getGuestFromLocation } from './config';

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [guestName] = useState(getGuestFromLocation);

  useEffect(() => {
    audioRef.current = new Audio('/paulyudin-wedding-485932.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
        guestName={guestName}
      />
    );
  }

  // Set the wedding date for the countdown
  const weddingDate = new Date("2026-12-26T12:30:00+05:30");

  return (
    <div className="font-sans text-brand-mocha bg-brand-champagne bg-texture-paper overflow-hidden selection:bg-brand-gold/20">
      <Toaster position="top-center" />
      
      {/* Premium Floating Music Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 w-12 sm:w-14 h-12 sm:h-14 bg-white/70 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(197,160,89,0.2)] flex items-center justify-center border border-brand-gold/50 text-brand-mocha hover:scale-105 transition-all duration-300"
      >
        {isMusicPlaying ? <Music className="w-5 h-5 sm:w-6 sm:h-6" /> : <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />}
      </motion.button>

      <Hero guestName={guestName} />
      <DecorativeDivider />
      
      <div className="py-8 sm:py-12 bg-gradient-to-b from-white/90 via-brand-champagne/90 to-white/90 relative inner-border-gold m-4 sm:m-8 rounded-[2rem]">
        <CoupleDetails />
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-white/80 relative">
        <CeremonyDetails guestName={guestName} />
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-gradient-to-b from-white/80 via-brand-champagne/90 to-white/80 relative inner-border-gold m-4 sm:m-8 rounded-[2rem]">
        <Location />
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-white/80 relative">
        <Timeline />
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-white/80 relative">
          <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
            <span className="text-brand-mocha uppercase tracking-[0.4em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
              The Wait Is Almost Over
            </span>
          </div>
          <Countdown targetDate={weddingDate} />
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-brand-champagne/90 relative inner-border-gold m-4 sm:m-8 rounded-[2rem]">
        <RSVPForm />
      </div>

      <DecorativeDivider />

      <div className="py-8 sm:py-12 bg-gradient-to-b from-brand-champagne/80 to-white/90 relative">
        <WishesSection />
      </div>

      {/* Elegant Footer Signature */}
      <footer className="py-12 bg-white/90 border-t border-brand-gold/20 text-center relative overflow-hidden mt-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gold/10 blur-[80px] rounded-full pointer-events-none" />
        <Monogram className="relative w-20 h-20 mx-auto mb-4" />
        <p className="relative font-script text-5xl sm:text-6xl text-brand-mocha mb-2">Aashiq & Azka</p>
        <span className="relative text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-sans text-brand-sand font-semibold block mb-8">
          Saturday, 26th December 2026
        </span>

        <div className="relative max-w-md mx-auto px-6 space-y-3 text-brand-sand font-serif text-base sm:text-lg">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
            No: 242, 2A, Galle Road, Balapitiya
          </p>
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <a href="tel:+94775057207" className="hover:text-brand-gold transition-colors">077 505 7207</a>
            <span className="text-brand-gold/60">•</span>
            <a href="tel:+94755524303" className="hover:text-brand-gold transition-colors">075 552 4303</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
