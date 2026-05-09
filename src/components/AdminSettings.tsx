import { motion } from 'motion/react';
import { Gavel, DollarSign, Mail, Shield, UserPlus, Save, RotateCcw, MoreVertical, Edit3 } from 'lucide-react';

export default function Settings() {
  const templates = [
    { name: 'Registration Confirmation', active: true },
    { name: 'Payment Receipt', active: false },
    { name: 'Schedule Update Notice', active: false },
    { name: 'Results Announcement', active: false },
  ];

  const admins = [
    { name: 'Eleanor Sterling', email: 'e.sterling@sacredharmony.org', role: 'Super Admin', last: 'Today, 09:41 AM', initials: 'ES', isMe: true },
    { name: 'Jonathan Mercer', email: 'j.mercer@sacredharmony.org', role: 'Adjudicator Coordinator', last: 'Oct 10, 2023', initials: 'JM' },
    { name: 'Anna Wei', email: 'a.wei@sacredharmony.org', role: 'Finance Manager', last: 'Oct 08, 2023', initials: 'AW' },
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-5xl text-primary relative inline-block">
            System Settings
            <div className="absolute -bottom-2 left-0 w-1/3 h-px bg-secondary opacity-50" />
          </h1>
          <p className="text-on-surface-variant font-medium mt-4 max-w-2xl">
            Configure platform rules, manage financial parameters, and oversee administrative access to maintain the integrity of the competition.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 border border-secondary text-secondary rounded-lg font-bold hover:bg-secondary/5 transition-colors">
            <RotateCcw size={18} />
            Discard
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-lg font-bold hover:bg-on-primary-fixed-variant transition-all shadow-md">
            <Save size={18} />
            Save All Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Rules */}
        <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl border border-secondary/20 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8 border-b border-secondary/20 pb-4">
            <h3 className="font-display text-2xl text-primary flex items-center gap-3">
              <Gavel size={24} className="text-secondary" />
              Competition Rules
            </h3>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider bg-surface p-2 rounded">Last updated: Oct 12, 2023</span>
          </div>
          <div className="space-y-6">
            <label className="block text-sm font-bold text-on-surface">Official Guidelines Text (Publicly Visible)</label>
            <div className="relative">
              <textarea 
                className="w-full h-80 bg-surface border border-outline-variant rounded-lg p-6 text-sm leading-relaxed text-on-surface-variant focus:border-primary outline-none transition-all resize-none font-medium"
                defaultValue={`1. Eligibility\nParticipation is open to all choral ensembles and soloists who meet the criteria outlined in section A.\n\n2. Repertoire Requirements\nEnsembles must prepare three distinct pieces:\n- One classical sacred work (pre-20th century).\n- One contemporary piece or spiritual.\n- One piece of the ensemble's choosing.\n\n3. Adjudication Criteria\nPerformances will be evaluated based on intonation, rhythmic precision, diction, tone quality, and overall musical interpretation.`}
              />
            </div>
            <div className="flex justify-end">
              <button className="text-primary text-sm font-bold flex items-center gap-2 hover:text-secondary transition-colors">
                <Edit3 size={16} />
                Open Rich Text Editor
              </button>
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="xl:col-span-4 bg-surface-container-lowest rounded-xl border border-secondary/20 p-8 shadow-sm flex flex-col">
          <div className="mb-8 border-b border-secondary/20 pb-4">
             <h3 className="font-display text-2xl text-primary flex items-center gap-3">
              <DollarSign size={24} className="text-secondary" />
              Registration Fees
            </h3>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Soloist Entry Fee', value: '75.00' },
              { label: 'Small Ensemble (2-8 members)', value: '150.00' },
              { label: 'Full Choir (9+ members)', value: '300.00' },
            ].map((fee) => (
              <div key={fee.label}>
                <label className="block text-xs font-bold text-on-surface-variant mb-2">{fee.label}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-on-surface-variant font-bold">$</span>
                  <input 
                    type="number"
                    className="w-full bg-surface border border-outline-variant rounded-lg p-3 pl-8 text-sm font-bold focus:border-primary outline-none transition-all"
                    defaultValue={fee.value}
                  />
                </div>
              </div>
            ))}
            <div className="pt-6 border-t border-secondary/10 flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Late Fee Penalty</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-primary">+</span>
                <input type="number" className="w-20 bg-surface border border-outline-variant rounded p-1 text-center font-bold" defaultValue="50.00" />
              </div>
            </div>
          </div>
        </div>

        {/* Communications */}
        <div className="xl:col-span-12 bg-surface-container-lowest rounded-xl border border-secondary/20 p-8 shadow-sm">
          <div className="mb-8 border-b border-secondary/20 pb-4">
            <h3 className="font-display text-2xl text-primary flex items-center gap-4">
              <Mail size={24} className="text-secondary" />
              Automated Communications
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-on-surface">
            <div className="lg:col-span-1 space-y-2 border-r border-secondary/10 pr-6">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Select Template</label>
              {templates.map(t => (
                <button 
                  key={t.name}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all border-l-4 ${
                    t.active ? 'bg-primary/5 text-primary border-primary' : 'text-on-surface-variant hover:bg-surface border-transparent'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Subject Line</label>
                <input 
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-sm font-bold focus:border-primary outline-none transition-all"
                  defaultValue="Registration Confirmed: Commission Gospel Talent Hunt"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email Body (Use {"{{tags}}"} for dynamic content)</label>
                <textarea 
                  className="w-full h-48 bg-surface border border-outline-variant rounded-lg p-6 text-sm leading-relaxed text-on-surface-variant focus:border-primary outline-none transition-all resize-none font-medium"
                  defaultValue={`Dear {{Participant_Name}},\n\nBlessings and welcome. We have successfully received your registration for the upcoming Commission Gospel Talent Hunt.\n\nYour registration ID is: {{Registration_ID}}\n\nPlease review the competition guidelines attached to this email or visit your participant dashboard for scheduling details. We look forward to hearing your voice lift the spirit of our community.\n\nIn harmony,\nThe Administration Team`}
                />
              </div>
              <div className="flex justify-end">
                <button className="text-primary font-bold text-xs hover:bg-primary/5 px-4 py-2 rounded transition-colors uppercase tracking-widest">
                  Send Test Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Access Management */}
        <div className="xl:col-span-12 bg-surface-container-lowest rounded-xl border border-secondary/20 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8 border-b border-secondary/20 pb-4">
            <h3 className="font-display text-2xl text-primary flex items-center gap-4">
              <Shield size={24} className="text-secondary" />
              Access Management
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-primary text-sm font-bold hover:bg-surface-container transition-all">
              <UserPlus size={18} />
              Invite Admin
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-secondary/10">
                  <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">User</th>
                  <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Role</th>
                  <th className="py-4 px-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Last Login</th>
                  <th className="py-4 px-4 text-right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/5 font-medium">
                {admins.map((adm) => (
                  <tr key={adm.email} className="hover:bg-surface/50 transition-colors">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${adm.isMe ? 'bg-primary text-on-primary' : 'bg-surface-dim text-on-surface'}`}>
                          {adm.initials}
                        </div>
                        <div>
                          <p className={`text-sm ${adm.isMe ? 'text-primary font-bold' : 'text-on-surface'}`}>{adm.name}{adm.isMe && ' (You)'}</p>
                          <p className="text-xs text-on-surface-variant">{adm.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${adm.role === 'Super Admin' ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant'}`}>
                        {adm.role}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-sm text-on-surface-variant">{adm.last}</td>
                    <td className="py-5 px-4 text-right">
                      <button className="text-outline hover:text-primary transition-colors p-2">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
