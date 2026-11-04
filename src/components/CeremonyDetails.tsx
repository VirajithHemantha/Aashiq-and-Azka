import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, MapPin, Heart, Sparkles } from 'lucide-react';

export const CeremonyDetails: React.FC<{ guestName?: string }> = ({ guestName }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Premium ambient backdrop */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-radial from-brand-gold/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-brand-mocha uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                Insha Allah
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-brand-mocha/60 to-transparent" />
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-brand-mocha mb-8 leading-[1.1] drop-shadow-sm">
              The Waleema <br />
              <span className="italic font-light text-brand-mocha">Ceremony</span>
            </h2>
            
            <p className="text-brand-sand/90 font-serif text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              Mr. Mohamed Anfaz &amp; Mrs. Samsul Nihara request the honour of the presence of {guestName ? <strong className="font-semibold text-brand-mocha">{guestName}</strong> : 'you'} on the occasion of the Waleema Ceremony of their beloved son Al Haafiz Aashiq &amp; Azka, beloved daughter of Mrs. Noorul Hinaya.
            </p>

            {/* Premium Timeline */}
            <div className="relative space-y-12 ml-10 sm:ml-12 border-l-[1.5px] border-brand-gold/30 pl-10 sm:pl-12 py-4">
              
              {/* Calendar */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-gold/40 shadow-lg flex items-center justify-center group-hover:border-brand-mocha group-hover:shadow-[0_4px_15px_rgba(197,160,89,0.3)] transition-all duration-500">
                  <Calendar className="w-5 h-5 text-brand-mocha group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-brand-mocha mb-2 group-hover:text-brand-mocha transition-colors duration-500">Saturday, 26th December</h4>
                  <p className="text-brand-sand/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">The Year Two Thousand Twenty Six</p>
                </div>
              </div>

              {/* Clock */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-gold/40 shadow-lg flex items-center justify-center group-hover:border-brand-mocha group-hover:shadow-[0_4px_15px_rgba(197,160,89,0.3)] transition-all duration-500">
                  <Clock className="w-5 h-5 text-brand-mocha group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-brand-mocha mb-2 group-hover:text-brand-mocha transition-colors duration-500">12:30 PM</h4>
                  <p className="text-brand-sand/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">Waleema Lunch</p>
                </div>
              </div>

              {/* Location */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-gold/40 shadow-lg flex items-center justify-center group-hover:border-brand-mocha group-hover:shadow-[0_4px_15px_rgba(197,160,89,0.3)] transition-all duration-500">
                  <MapPin className="w-5 h-5 text-brand-mocha group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-brand-mocha mb-2 group-hover:text-brand-mocha transition-colors duration-500">Hill View Resort</h4>
                  <p className="text-brand-sand/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">195, Kandawatta, Koswattagoda, Dharga Town</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Composition */}
        <div className="lg:w-1/2 w-full relative mt-16 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Artistic Background Frame */}
            <div className="absolute -inset-4 sm:-inset-6 border-[2px] border-brand-gold/30 arch-shape -z-10 translate-x-4 sm:translate-x-8 translate-y-4 sm:translate-y-8" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-champagne/40 arch-shape blur-2xl -z-20" />

            {/* Main Creative Image Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] arch-shape overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(197,160,89,0.2)] bg-white group">
              <img
                src="/x.jpg"
                alt="Ceremony Venue"
                className="w-full h-full object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none mix-blend-overlay opacity-opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>

            {/* Decorative Floating Circles */}
            <div className="absolute -top-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 rounded-full border-[1.5px] border-dashed border-brand-gold/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 rounded-full border-[1.5px] border-brand-gold/20" />
          </motion.div>

          {/* Reception Card — Placed Below Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="mt-10 sm:mt-14 bg-white/85 backdrop-blur-xl p-6 sm:p-10 shadow-[0_30px_60px_rgba(197,160,89,0.15)] rounded-2xl border border-white relative overflow-hidden"
          >
            <div className="absolute inset-x-8 -top-px h-[2px] bg-gradient-to-r from-transparent via-brand-mocha/60 to-transparent" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <Heart className="text-brand-mocha w-8 h-8 sm:w-10 sm:h-10 fill-brand-gold/20 drop-shadow-sm flex-shrink-0" />
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse flex-shrink-0" />
              </div>
              <div className="flex-1">
                <p dir="rtl" lang="ar" className="font-arabic text-xl sm:text-2xl text-brand-mocha mb-2 leading-loose">
                  بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                </p>
                <p className="text-brand-sand/90 font-serif italic text-sm sm:text-base leading-relaxed">
                  "May Allah bless you, shower His blessings upon you, and unite you both in goodness."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
