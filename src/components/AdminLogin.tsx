import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  error?: string;
}

export default function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface-container-lowest border border-secondary/20 rounded-2xl shadow-2xl p-10 text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <Lock size={32} />
          </div>
        </div>

        <h2 className="font-display text-3xl text-primary mb-2">Admin Access</h2>
        <p className="text-on-surface-variant mb-8 text-sm">Please enter the administrative credentials to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2 ml-1">Password</label>
            <input 
              type="password"
              autoFocus
              className={`w-full bg-surface border rounded-xl p-4 text-on-surface focus:ring-2 outline-none transition-all ${
                error ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary focus:ring-primary/20'
              }`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 flex items-center gap-2 text-error text-xs font-medium"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-all shadow-lg active:scale-[0.98]"
          >
            Authenticate
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-outline-variant/30 flex items-center justify-center gap-2 text-outline text-xs grayscale">
          <ShieldCheck size={16} />
          <span className="font-bold uppercase tracking-widest">Secure Entry Point</span>
        </div>
      </motion.div>
    </div>
  );
}
