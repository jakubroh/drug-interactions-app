import { Medication } from '@/types';

const STORAGE_KEY = 'medications';

export const saveMedications = (medications: Medication[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medications));
  }
};

export const loadMedications = (): Medication[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const medications = JSON.parse(stored);
        // Konvertovat stringy zpět na Date objekty
        return medications.map((med: { createdAt: string; updatedAt: string; [key: string]: unknown }) => ({
          ...med,
          createdAt: new Date(med.createdAt),
          updatedAt: new Date(med.updatedAt),
        }));
      } catch (error) {
        console.error('Error parsing stored medications:', error);
        return [];
      }
    }
  }
  return [];
};

export const addMedication = (medication: Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>): Medication => {
  const newMedication: Medication = {
    ...medication,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const medications = loadMedications();
  medications.push(newMedication);
  saveMedications(medications);
  
  return newMedication;
};

export const updateMedication = (id: string, updates: Partial<Medication>): Medication | null => {
  const medications = loadMedications();
  const index = medications.findIndex(med => med.id === id);
  
  if (index === -1) return null;
  
  medications[index] = {
    ...medications[index],
    ...updates,
    updatedAt: new Date(),
  };
  
  saveMedications(medications);
  return medications[index];
};

export const deleteMedication = (id: string): boolean => {
  const medications = loadMedications();
  const filtered = medications.filter(med => med.id !== id);
  
  if (filtered.length === medications.length) return false;
  
  saveMedications(filtered);
  return true;
}; 