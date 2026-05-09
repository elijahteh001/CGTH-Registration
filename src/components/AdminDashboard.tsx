import { motion } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  AlertCircle, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Bell, 
  Download,
  CheckCircle2,
  UploadCloud,
  MessageSquare,
  Plus
} from 'lucide-react';

interface AdminDashboardProps {
  setAdminPage: (page: any) => void;
}

export default function Dashboard({ setAdminPage }: AdminDashboardProps) {
  const stats = [
    { label: 'Total Participants', value: '1,248', trend: '+12% from last month', icon: Users, color: 'text-primary' },
    { label: 'Registrations This Week', value: '84', trend: '+5 since yesterday', icon: UserPlus, color: 'text-primary' },
    { label: 'Pending Reviews', value: '32', trend: 'Requires attention', icon: AlertCircle, color: 'text-error' },
    { label: 'Total Revenue', value: '$42.5k', trend: 'Registration fees', icon: DollarSign, color: 'text-secondary' },
  ];

  const activities = [
    { user: 'Sarah Jenkins', action: 'completed her registration for the Soprano category.', time: '10 minutes ago', icon: CheckCircle2, iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
    { user: 'David Chen', action: 'uploaded his preliminary audition video.', time: '1 hour ago', icon: UploadCloud, iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
    { user: 'Choir Director Smith', action: 'sent a new support ticket regarding scheduling conflicts.', time: '3 hours ago', icon: AlertCircle, iconBg: 'bg-error-container', iconColor: 'text-error' },
    { user: 'System', action: 'sent automated reminder to 50 pending applicants.', time: 'Yesterday at 4:00 PM', icon: Bell, iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
  ];

  const quickActions = [
    { 
      label: 'Send Announcement', 
      desc: 'Broadcast to all participants', 
      icon: Bell, 
      action: () => alert('Announcement composer will open shortly.') 
    },
    { 
      label: 'Export Participant List', 
      desc: 'Download CSV data', 
      icon: FileText, 
      action: () => alert('Generating participant export. Download will start automatically.')
    },
    { 
      label: 'Review Applications', 
      desc: '32 pending reviews', 
      icon: AlertCircle, 
      action: () => setAdminPage('participants')
    },
    { 
      label: 'Add Custom Action', 
      desc: '', 
      icon: Plus, 
      dashed: true,
      action: () => alert('Customize your dashboard actions in settings.')
    },
  ];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display text-4xl text-primary mb-2">Overview</h2>
          <p className="text-on-surface-variant font-medium">Welcome back. Here is the current status of the competition.</p>
        </div>
        <button className="px-6 py-2 border border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary/5 transition-colors">
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container-lowest p-6 rounded-xl border border-secondary/20 shadow-sm relative overflow-hidden group hover:border-secondary/50 transition-colors"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={64} className="text-primary" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <stat.icon size={18} className={stat.color} />
              <h3 className="text-sm font-semibold text-on-surface-variant">{stat.label}</h3>
            </div>
            <div className="font-display text-4xl text-primary mb-2">{stat.value}</div>
            <div className={`flex items-center gap-1 text-xs ${stat.label === 'Pending Reviews' ? 'text-error' : 'text-green-600'}`}>
              {stat.label !== 'Total Revenue' && <TrendingUp size={12} />}
              {stat.label === 'Pending Reviews' && <AlertCircle size={12} />}
              <span>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-secondary/20 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-secondary/20 pb-4">
            <h3 className="font-display text-2xl text-primary">Recent Activity</h3>
            <button className="text-primary hover:text-tertiary font-semibold text-sm">View All</button>
          </div>
          <div className="space-y-6">
            {activities.map((act, i) => (
              <div key={i} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-full ${act.iconBg} flex items-center justify-center flex-shrink-0 ${act.iconColor}`}>
                  <act.icon size={20} />
                </div>
                <div className="flex-1 pb-6 border-b border-secondary/10 last:border-0 last:pb-0">
                  <p className="text-on-surface text-sm">
                    <span className="font-bold text-primary">{act.user}</span> {act.action}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface-container-lowest rounded-xl border border-secondary/20 p-8 shadow-sm flex flex-col">
          <div className="mb-6 border-b border-secondary/20 pb-4">
            <h3 className="font-display text-2xl text-primary">Quick Actions</h3>
          </div>
          <div className="space-y-3 flex-1">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={action.action}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left group ${
                  action.dashed 
                    ? 'border-secondary/20 border-dashed mt-auto hover:border-primary hover:bg-primary/5' 
                    : 'border-secondary/20 hover:border-primary hover:bg-primary/5'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors text-primary">
                  <action.icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">{action.label}</h4>
                  {action.desc && <p className="text-xs text-on-surface-variant">{action.desc}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
