import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Music, Edit, ArrowRight, Coffee, Star } from 'lucide-react';

export default function Schedule() {
  const events = [
    { 
      id: 1, 
      time: '09:00 AM', 
      duration: '45 min', 
      group: 'St. Jude Youth Choir', 
      category: 'Vocal Ensemble', 
      isLive: true, 
      venue: 'Main Sanctuary', 
      stage: 'Stage A', 
      repertoire: '"Ave Maria" - Schubert', 
      accomp: 'Piano & Strings' 
    },
    { 
      id: 2, 
      time: '10:00 AM', 
      duration: '30 min', 
      group: 'Elena Rodriguez', 
      category: 'Solo Soprano', 
      venue: 'Chapel Hall', 
      stage: 'Stage B', 
      repertoire: '"Panis Angelicus"', 
      accomp: 'Organ' 
    },
  ];

  return (
    <div className="min-h-screen bg-sacred-grid flex flex-col">
      {/* Header */}
      <div className="px-8 py-8 border-b border-secondary/20 bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px w-8 bg-secondary/50" />
              <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em]">Preliminary Rounds</span>
            </div>
            <h1 className="font-display text-5xl text-primary">Master Schedule</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-surface-container-lowest border border-secondary/30 rounded-lg p-1 shadow-sm">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><ChevronLeft size={18} /></button>
              <div className="px-4 py-1.5 text-sm font-bold text-primary flex items-center gap-2">
                <CalendarIcon size={14} className="text-secondary" />
                Saturday, Oct 14
              </div>
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><ChevronRight size={18} /></button>
            </div>
            <div className="flex bg-surface-container-low rounded-lg p-1 border border-outline-variant/30">
              <button className="px-4 py-1.5 rounded-md bg-surface-container-lowest shadow-sm text-sm font-bold text-primary">Day</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Week</button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-12 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="col-span-full lg:col-span-8">
          <div className="relative pl-8 md:pl-28">
            <div className="absolute left-[1.35rem] md:left-[6.25rem] top-4 bottom-0 w-px bg-secondary/20" />

            {/* LIVE EVENT */}
            <div className="relative mb-12">
              <div className="hidden md:block absolute -left-28 top-6 w-20 text-right">
                <span className="font-display text-2xl text-primary block leading-none">09:00</span>
                <span className="text-[10px] font-bold text-on-surface-variant mt-2 block">45 min</span>
              </div>
              <div className="absolute -left-5 md:-left-[1.65rem] top-7 w-4 h-4 rounded-full bg-primary border-4 border-surface shadow-[0_0_15px_rgba(0,17,58,0.4)] z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
              
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-surface-container-lowest border border-primary/20 rounded-xl p-8 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl -z-10 -mr-20 -mt-20" />
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live Now
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[10px] font-bold border border-outline-variant/30">
                      Vocal Ensemble
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-3xl text-primary mb-6">St. Jude Youth Choir</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-secondary/70 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-on-surface">Main Sanctuary</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Stage A</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Music size={18} className="text-secondary/70 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-on-surface">{events[0].repertoire}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{events[0].accomp}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-secondary/10 flex justify-end">
                  <button className="text-sm font-bold text-primary hover:text-secondary flex items-center gap-1 transition-colors">
                    Manage Entry <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* UPCOMING EVENT */}
            <div className="relative mb-12">
              <div className="hidden md:block absolute -left-28 top-6 w-20 text-right">
                <span className="font-display text-2xl text-on-surface block leading-none">10:00</span>
                <span className="text-[10px] font-bold text-on-surface-variant mt-2 block">30 min</span>
              </div>
              <div className="absolute -left-4 md:-left-[1.4rem] top-7 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-surface z-10" />
              
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-surface-container-lowest border border-secondary/20 rounded-xl p-8 shadow-sm group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold">
                       Upcoming
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[10px] font-bold border border-outline-variant/30">
                      Solo Soprano
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-3xl text-primary mb-6">Elena Rodriguez</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-secondary/70 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-on-surface">Chapel Hall</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Stage B</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Music size={18} className="text-secondary/70 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-on-surface">{events[1].repertoire}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{events[1].accomp}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* BREAK */}
            <div className="relative opacity-60">
              <div className="hidden md:block absolute -left-28 top-6 w-20 text-right">
                <span className="font-display text-2xl text-on-surface-variant block leading-none">10:45</span>
                <span className="text-[10px] font-bold text-outline mt-2 block">15 min Break</span>
              </div>
              <div className="absolute -left-3.5 md:-left-[1.3rem] top-7 w-2 h-2 rounded-full bg-outline-variant z-10" />
              <div className="bg-surface border border-outline-variant/30 rounded-xl p-4 flex items-center justify-center gap-3">
                <Coffee size={18} className="text-outline" />
                <span className="text-sm font-bold text-outline">Intermission & Stage Reset</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="hidden lg:block lg:col-span-4 space-y-8">
          <div className="bg-surface-container-lowest border border-secondary/20 rounded-xl p-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100px] -z-10" />
              <h3 className="font-display text-xl text-primary mb-8 flex items-center gap-2">
                <Star size={20} className="text-secondary" />
                Stage Status
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Main Sanctuary', status: 'LIVE', color: 'bg-error' },
                  { name: 'Chapel Hall', status: 'Prep', color: 'bg-secondary' },
                  { name: 'Choir Room C', status: 'Offline', color: 'bg-outline', opacity: 'opacity-50' },
                ].map((s) => (
                  <div key={s.name} className={`flex items-center justify-between p-4 rounded-lg bg-surface border border-outline-variant/20 ${s.opacity}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${s.color} ${s.status === 'LIVE' ? 'animate-pulse' : ''}`} />
                      <span className="text-sm font-bold text-on-surface">{s.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      s.status === 'LIVE' ? 'bg-error/10 text-error' : s.status === 'Prep' ? 'bg-secondary/10 text-secondary' : 'bg-outline/10 text-outline'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
          </div>
          
          <div className="bg-surface-container-lowest border border-secondary/20 rounded-xl p-8 shadow-sm">
            <h3 className="font-display text-xl text-primary mb-6">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {['All Categories', 'Solo', 'Duet', 'Ensemble', 'Youth Choir'].map((cat, i) => (
                <button 
                  key={cat} 
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    i === 0 ? 'bg-primary text-on-primary border-primary' : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
