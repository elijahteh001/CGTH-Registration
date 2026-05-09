import { useState, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, User, Check, Diamond, Music, Star, Users as Groups, Piano, Mic2, Info, Send, Lock, Search, PhoneCall, Camera, Upload, X, AlertCircle } from 'lucide-react';
import type { RegistrationData, ParticipantStep } from '../types';

interface StepProps {
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  next: () => void;
  prev?: () => void;
}

function Step1({ data, updateData, next }: StepProps) {
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNext = () => {
    if (!data.email) {
      setEmailError('Email address is required.');
      return;
    }
    if (!validateEmail(data.email)) {
      setEmailError('Please enter a valid email address (e.g., name@example.com).');
      return;
    }
    setEmailError('');
    next();
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel rounded-xl p-8 md:p-12 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <User size={128} className="text-primary" />
      </div>
      
      <h2 className="font-display text-3xl text-primary mb-8 border-b border-secondary/30 pb-4 inline-block">
        Participant Information
      </h2>

      <div className="mb-10 relative z-10 flex flex-col items-center">
        <label className="block text-on-surface-variant text-sm font-semibold mb-4 text-center">
          Profile Photo <span className="text-outline text-xs font-normal">(Required for Identification)</span>
        </label>
        
        <div className="relative group">
          <div className={`w-40 h-40 rounded-full border-2 border-dashed overflow-hidden flex items-center justify-center transition-all ${
            data.photo 
              ? 'border-secondary' 
              : 'border-outline-variant hover:border-primary bg-surface-container-lowest'
          }`}>
            {data.photo ? (
              <img src={data.photo} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-outline group-hover:text-primary transition-colors">
                <Camera size={40} strokeWidth={1.5} />
                <span className="text-xs font-medium mt-2">Upload Photo</span>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handlePhotoChange}
            />
          </div>

          {data.photo && (
            <button 
              onClick={() => updateData({ photo: '' })}
              className="absolute -top-2 -right-2 bg-error text-on-error w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-error/90 transition-colors z-20"
            >
              <X size={16} />
            </button>
          )}

          {!data.photo && (
            <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg pointer-events-none">
              <Upload size={18} />
            </div>
          )}
        </div>
        <p className="text-xs text-outline mt-4">JPG, PNG or GIF. Max 2MB.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="col-span-full lg:col-span-1">
          <label className="block text-on-surface-variant text-sm font-semibold mb-2">Full Legal Name</label>
          <input 
            type="text"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="First Last"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-on-surface-variant text-sm font-semibold mb-2">
            Stage Name <span className="text-outline text-xs font-normal">(Optional)</span>
          </label>
          <input 
            type="text"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Name used for program"
            value={data.stageName}
            onChange={(e) => updateData({ stageName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-on-surface-variant text-sm font-semibold mb-2">Age</label>
            <input 
              type="number"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Years"
              value={data.age}
              onChange={(e) => updateData({ age: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-on-surface-variant text-sm font-semibold mb-2">Gender</label>
            <select 
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              value={data.gender}
              onChange={(e) => updateData({ gender: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-on-surface-variant text-sm font-semibold mb-2">Phone Number</label>
          <input 
            type="tel"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="(555) 123-4567"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
          />
        </div>
        <div className="col-span-full font-sans">
          <label className="block text-on-surface-variant text-sm font-semibold mb-2">Email Address</label>
          <input 
            type="email"
            className={`w-full bg-surface-container-lowest border rounded-lg p-3 text-on-surface outline-none transition-all ${
              emailError ? 'border-error ring-1 ring-error' : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'
            }`}
            placeholder="participant@example.com"
            value={data.email}
            onChange={(e) => {
              updateData({ email: e.target.value });
              if (emailError) setEmailError('');
            }}
          />
          {emailError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-error text-xs font-medium"
            >
              <AlertCircle size={14} />
              {emailError}
            </motion.div>
          )}
        </div>
        <div className="col-span-full">
          <label className="block text-on-surface-variant text-sm font-semibold mb-2">Home Address</label>
          <input 
            type="text"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all mb-4"
            placeholder="Street Address"
            value={data.address.street}
            onChange={(e) => updateData({ address: { ...data.address, street: e.target.value } })}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="City"
              value={data.address.city}
              onChange={(e) => updateData({ address: { ...data.address, city: e.target.value } })}
            />
            <input 
              type="text"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="State/Prov"
              value={data.address.state}
              onChange={(e) => updateData({ address: { ...data.address, state: e.target.value } })}
            />
          </div>
        </div>
        <div className="col-span-full pt-4">
          <label className="block text-primary text-sm font-semibold mb-2">Representing Church Name</label>
          <input 
            type="text"
            className="w-full bg-surface-container-lowest border border-secondary/50 rounded-lg p-3 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none transition-all"
            placeholder="Name of your home congregation"
            value={data.churchName}
            onChange={(e) => updateData({ churchName: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center pt-8 border-t border-outline-variant">
        <span className="text-on-surface-variant text-sm font-semibold">Step 1 of 4</span>
        <button 
          onClick={handleNext}
          className="bg-primary text-on-primary px-10 py-3 rounded-lg font-semibold hover:bg-on-primary-fixed-variant transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5"
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function Step2({ data, updateData, next, prev }: StepProps) {
  const categories = [
    { id: 'solo', label: 'Soloist', icon: User, desc: 'Individual vocal performance.' },
    { id: 'duo', label: 'Duo / Trio', icon: Groups, desc: '2-3 vocalists performing together.' },
    { id: 'choir', label: 'Choir Ensemble', icon: Mic2, desc: '4+ vocalists, harmonized group.' },
    { id: 'instrumental', label: 'Vocal w/ Instrument', icon: Piano, desc: 'Vocalist accompanying themselves.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm border border-secondary/20"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px bg-secondary/30 flex-1 max-w-[100px]" />
          <Diamond size={16} className="text-secondary" />
          <div className="h-px bg-secondary/30 flex-1 max-w-[100px]" />
        </div>
        <h2 className="font-display text-4xl text-primary mb-2">Competition Details</h2>
        <p className="text-on-surface-variant">Step 2 of 4: Define your offering</p>
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="font-display text-2xl text-primary mb-6 flex items-center gap-2">
            <Groups className="text-secondary" />
            Performance Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateData({ performanceCategory: cat.id as any })}
                className={`flex flex-col p-6 border rounded-xl transition-all text-left ${
                  data.performanceCategory === cat.id 
                    ? 'border-primary bg-primary-fixed/10 ring-2 ring-primary ring-inset' 
                    : 'border-outline-variant hover:border-primary/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <cat.icon size={32} className="text-on-surface-variant" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    data.performanceCategory === cat.id ? 'border-primary bg-primary' : 'border-outline-variant'
                  }`}>
                    {data.performanceCategory === cat.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
                <span className="font-semibold text-on-surface mb-1">{cat.label}</span>
                <span className="text-xs text-on-surface-variant">{cat.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-on-surface-variant text-sm font-semibold mb-2">Music Genre / Style</label>
            <select 
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              value={data.genre}
              onChange={(e) => updateData({ genre: e.target.value })}
            >
              <option value="">Select a stylistic category...</option>
              <option value="Hymnody">Traditional Hymnody</option>
              <option value="Contemporary">Contemporary Worship</option>
              <option value="Gospel">Traditional Gospel</option>
              <option value="Classical">Classical Sacred</option>
            </select>
          </div>
          <div>
            <label className="block text-on-surface-variant text-sm font-semibold mb-2">Primary Song Title</label>
            <input 
              type="text"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="e.g., How Great Thou Art"
              value={data.songTitle}
              onChange={(e) => updateData({ songTitle: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center pt-8 border-t border-outline-variant">
        <button 
          onClick={prev}
          className="text-primary font-semibold flex items-center gap-2 hover:translate-x-[-4px] transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button 
          onClick={next}
          className="bg-primary text-on-primary px-10 py-3 rounded-lg font-semibold hover:bg-on-primary-fixed-variant transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5"
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function Step3({ data, updateData, next, prev }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="text-center mb-12">
        <p className="text-secondary text-xs font-bold tracking-widest uppercase mb-2">Step 3 of 4</p>
        <h2 className="font-display text-4xl text-primary mb-4">Emergency Contact</h2>
      </div>

      <div className="bg-surface-container-lowest border border-secondary/20 rounded-xl p-10 shadow-sm">
        <div className="space-y-8">
          <div>
            <label className="block text-primary text-sm font-semibold mb-2">Full Name</label>
            <input 
              type="text"
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary outline-none transition-all"
              placeholder="e.g., Jane Doe"
              value={data.emergencyContact.name}
              onChange={(e) => updateData({ emergencyContact: { ...data.emergencyContact, name: e.target.value } })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-primary text-sm font-semibold mb-2">Relationship</label>
              <input 
                type="text"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary outline-none transition-all"
                value={data.emergencyContact.relationship}
                onChange={(e) => updateData({ emergencyContact: { ...data.emergencyContact, relationship: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-primary text-sm font-semibold mb-2">Phone</label>
              <input 
                type="tel"
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-on-surface focus:border-primary outline-none transition-all"
                value={data.emergencyContact.phone}
                onChange={(e) => updateData({ emergencyContact: { ...data.emergencyContact, phone: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </div>

       <div className="mt-12 flex justify-between items-center pt-8 border-t border-secondary/20">
        <button onClick={prev} className="text-primary font-semibold flex items-center gap-2 transition-all">
          <ArrowLeft size={20} /> Back
        </button>
        <button onClick={next} className="bg-primary text-on-primary px-10 py-3 rounded-lg font-semibold shadow-md">
          Next Step <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

function Step4({ data, updateData, prev, onSubmit }: StepProps & { onSubmit: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto w-full"
    >
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl text-primary mb-4">Registration Agreement</h2>
      </div>

      <div className="bg-surface-container-lowest border border-secondary/20 rounded-xl p-8 md:p-12 shadow-sm">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-primary text-sm font-semibold mb-2">Signature</label>
              <input 
                type="text"
                className="w-full border border-outline-variant rounded-lg p-3"
                value={data.signature}
                onChange={(e) => updateData({ signature: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-primary text-sm font-semibold mb-2">Date</label>
              <input type="date" className="w-full border border-outline-variant rounded-lg p-3" value={data.date} onChange={(e) => updateData({ date: e.target.value })} />
            </div>
          </div>
          <button onClick={onSubmit} className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold text-lg shadow-lg">Finalize Registration</button>
        </div>
      </div>
      <div className="mt-12">
        <button onClick={prev} className="text-primary font-semibold flex items-center gap-2">
          <ArrowLeft size={20} /> Back
        </button>
      </div>
    </motion.div>
  );
}

interface ParticipantFormProps {
  step: ParticipantStep;
  setStep: (step: ParticipantStep) => void;
  data: RegistrationData;
  updateData: (updates: Partial<RegistrationData>) => void;
  onSubmit: () => void;
}

export default function ParticipantForm({ step, setStep, data, updateData, onSubmit }: ParticipantFormProps) {
  const next = () => setStep(Math.min(step + 1, 4) as ParticipantStep);
  const prev = () => setStep(Math.max(step - 1, 1) as ParticipantStep);

  return (
    <div className="min-h-screen py-16 px-4 max-w-6xl mx-auto">
      {step === 1 && <Step1 data={data} updateData={updateData} next={next} />}
      {step === 2 && <Step2 data={data} updateData={updateData} next={next} prev={prev} />}
      {step === 3 && <Step3 data={data} updateData={updateData} next={next} prev={prev} />}
      {step === 4 && <Step4 data={data} updateData={updateData} next={next} prev={prev} onSubmit={onSubmit} />}
    </div>
  );
}
