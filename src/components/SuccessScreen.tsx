import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Music, 
  Calendar, 
  ArrowRight, 
  Mail, 
  Printer, 
  Share2,
  Diamond
} from 'lucide-react';

interface SuccessScreenProps {
  onReset: () => void;
}

export default function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div className="min-h-screen bg-sacred-grid flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full bg-surface-container-lowest border border-secondary/20 rounded-2xl shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Music size={256} className="text-secondary" />
        </div>
        
        {/* Gold Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />

        <div className="p-12 md:p-16 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(115,92,0,0.3)]">
                <CheckCircle2 size={64} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-5xl text-primary mb-6">Registration Confirmed</h1>
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Blessings on your creative journey. We have successfully received your application for the <span className="text-primary font-bold">Commission Gospel Talent Hunt</span>.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left"
          >
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 flex gap-4 transition-all hover:border-secondary/50">
              <div className="w-12 h-12 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary mb-1">Save the Date</h4>
                <p className="text-sm text-on-surface-variant">The preliminary rounds begin <span className="font-bold">May 15th, 2024</span>. Your specific time slot will be sent shortly.</p>
              </div>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-outline-variant/30 flex gap-4 transition-all hover:border-secondary/50">
              <div className="w-12 h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-primary mb-1">Check Your Inbox</h4>
                <p className="text-sm text-on-surface-variant">We've sent a detailed confirmation email with rehearsal tracks and venue directions.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <button className="bg-primary text-on-primary px-10 py-3.5 rounded-lg font-bold flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-all shadow-lg hover:-translate-y-1">
              View Participant Dashboard
              <ArrowRight size={20} />
            </button>
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface hover:text-primary transition-all shadow-sm">
                <Printer size={20} />
              </button>
              <button className="w-12 h-12 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface hover:text-primary transition-all shadow-sm">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-secondary/20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="h-px w-12 bg-secondary/30" />
              <Diamond size={12} className="text-secondary" />
              <div className="h-px w-12 bg-secondary/30" />
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.3em]">Excellence. Character. Kingdom.</p>
            <button 
              onClick={onReset}
              className="text-sm font-bold text-outline hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
            >
              Start Another Registration
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
