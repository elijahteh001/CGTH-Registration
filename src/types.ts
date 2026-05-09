export type PerformanceCategory = 'solo' | 'duo' | 'choir' | 'instrumental';

export interface RegistrationData {
  // Step 1
  fullName: string;
  stageName?: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  churchName: string;
  photo?: string;

  // Step 2
  performanceCategory: PerformanceCategory;
  genre: string;
  songTitle: string;
  experienceLevel: string;
  accompaniment: string[];

  // Step 3
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  // Step 4
  signature: string;
  date: string;
  guardianSignature?: string;
  guardianRelationship?: string;
}

export type View = 'participant' | 'admin' | 'success';
export type ParticipantStep = 1 | 2 | 3 | 4;
export type AdminPage = 'dashboard' | 'participants' | 'schedule' | 'settings';
