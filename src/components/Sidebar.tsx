import { motion } from 'motion/react';
import { 
  Users, 
  Music, 
  PhoneCall, 
  FileCheck, 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  ArrowRight,
  LogOut,
  HelpCircle,
  Plus
} from 'lucide-react';
import type { View, ParticipantStep, AdminPage } from '../types';

interface SidebarProps {
  view: View;
  setView: (view: View) => void;
  step?: ParticipantStep;
  setStep?: (step: ParticipantStep) => void;
  adminPage?: AdminPage;
  setAdminPage?: (page: AdminPage) => void;
  onSubmit?: () => void;
  canSubmit?: boolean;
}

export default function Sidebar({ 
  view, 
  setView, 
  step, 
  setStep, 
  adminPage, 
  setAdminPage,
  onSubmit,
  canSubmit 
}: SidebarProps) {
  const isParticipant = view === 'participant' || view === 'success';

  return (
    <aside className="bg-surface-container-low w-64 h-screen border-r border-outline-variant flex flex-col fixed left-0 top-0 z-50">
      {/* Header */}
      <div className="p-6 border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
            <Music size={24} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-primary leading-tight">
              Commission Gospel Talent Hunt
            </h1>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium mt-1">
          Vocal Excellence for His Glory
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 overflow-y-auto">
        {isParticipant ? (
          <nav className="px-3 space-y-2">
            {[
              { id: 1, label: 'Participant Info', icon: Users },
              { id: 2, label: 'Competition Details', icon: Music },
              { id: 3, label: 'Emergency Contact', icon: PhoneCall },
              { id: 4, label: 'Agreement', icon: FileCheck },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setStep?.(item.id as ParticipantStep)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  step === item.id 
                    ? 'bg-secondary-container text-on-secondary-container shadow-sm border border-secondary/20 scale-95' 
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-semibold whitespace-nowrap">{item.label}</span>
                {step && item.id < step && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-secondary"
                  >
                    <FileCheck size={16} />
                  </motion.div>
                )}
              </button>
            ))}
          </nav>
        ) : (
          <nav className="px-3 space-y-2">
             <div className="px-3 mb-4">
              <button className="w-full bg-primary text-on-primary py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2">
                <Plus size={18} />
                New Event
              </button>
            </div>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'participants', label: 'Participants', icon: Users },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setAdminPage?.(item.id as AdminPage)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  adminPage === item.id 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
              >
                <item.icon size={20} />
                <span className="text-sm font-semibold tracking-wider">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-outline-variant bg-surface-container-lowest">
        {isParticipant ? (
          <div className="space-y-4">
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className={`w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                canSubmit 
                  ? 'bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-sm' 
                  : 'bg-surface-variant text-outline cursor-not-allowed opacity-50'
              }`}
            >
              Submit Entry
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => setView('admin')}
              className="w-full py-2.5 px-4 bg-surface-variant hover:bg-outline-variant text-on-surface-variant rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={14} />
              Admin Portal
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button className="w-full flex items-center gap-4 px-4 py-2.5 text-on-surface-variant hover:text-primary transition-colors rounded-lg">
              <HelpCircle size={18} />
              <span className="text-sm">Support</span>
            </button>
            <button 
              onClick={() => setView('participant')}
              className="w-full flex items-center gap-4 px-4 py-2.5 text-on-surface-variant hover:text-error transition-colors rounded-lg"
            >
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
