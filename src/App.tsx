/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import ParticipantForm from './components/ParticipantForm';
import AdminDashboard from './components/AdminDashboard';
import AdminParticipants from './components/AdminParticipants';
import AdminSchedule from './components/AdminSchedule';
import AdminSettings from './components/AdminSettings';
import SuccessScreen from './components/SuccessScreen';
import AdminLogin from './components/AdminLogin';
import type { 
  View, 
  ParticipantStep, 
  AdminPage, 
  RegistrationData 
} from './types';

const INITIAL_REGISTRATION_DATA: RegistrationData = {
  fullName: '',
  stageName: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  address: {
    street: '',
    city: '',
    state: '',
  },
  churchName: '',
  photo: '',
  performanceCategory: 'solo',
  genre: '',
  songTitle: '',
  experienceLevel: '',
  accompaniment: [],
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
  },
  signature: '',
  date: new Date().toISOString().split('T')[0],
  guardianSignature: '',
  guardianRelationship: '',
};

export default function App() {
  const [view, setView] = useState<View>('participant');
  const [participantStep, setParticipantStep] = useState<ParticipantStep>(1);
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');
  const [registrationData, setRegistrationData] = useState<RegistrationData>(INITIAL_REGISTRATION_DATA);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState('');

  const handleAdminLogin = (password: string) => {
    if (password === 'CGTH@2026') {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
    } else {
      setAdminLoginError('Invalid administrative password. Access denied.');
    }
  };

  const updateRegistrationData = (updates: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...updates }));
  };

  const handleRegistrationSubmit = () => {
    // In a real app, we would send this data to a backend
    console.log('Submitting Registration:', registrationData);
    setView('success');
  };

  const handleReset = () => {
    setRegistrationData(INITIAL_REGISTRATION_DATA);
    setParticipantStep(1);
    setView('participant');
  };

  const canSubmit = 
    registrationData.fullName && 
    registrationData.email && 
    registrationData.phone && 
    registrationData.signature &&
    registrationData.performanceCategory &&
    registrationData.photo;

  return (
    <div className="flex min-h-screen bg-background font-sans selection:bg-secondary-container selection:text-on-secondary-container">
      {view !== 'success' && (
        <Sidebar 
          view={view} 
          setView={setView} 
          step={participantStep} 
          setStep={setParticipantStep}
          adminPage={adminPage}
          setAdminPage={setAdminPage}
          onSubmit={handleRegistrationSubmit}
          canSubmit={canSubmit}
        />
      )}

      <main className={`flex-1 transition-all duration-500 ease-in-out ${view !== 'success' ? 'ml-64' : 'ml-0'}`}>
        <AnimatePresence mode="wait">
          {view === 'participant' && (
            <motion.div
              key="participant-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="absolute top-0 right-0 w-full h-[500px] bg-secondary/5 blur-[120px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2 overflow-hidden" />
              <ParticipantForm 
                step={participantStep} 
                setStep={setParticipantStep}
                data={registrationData}
                updateData={updateRegistrationData}
                onSubmit={handleRegistrationSubmit}
              />
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={isAdminAuthenticated ? "p-10 max-w-7xl mx-auto" : ""}
            >
               {!isAdminAuthenticated ? (
                 <AdminLogin onLogin={handleAdminLogin} error={adminLoginError} />
               ) : (
                 <>
                   {adminPage === 'dashboard' && <AdminDashboard setAdminPage={setAdminPage} />}
                   {adminPage === 'participants' && <AdminParticipants />}
                   {adminPage === 'schedule' && <AdminSchedule />}
                   {adminPage === 'settings' && <AdminSettings />}
                 </>
               )}
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div
              key="success-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SuccessScreen onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

