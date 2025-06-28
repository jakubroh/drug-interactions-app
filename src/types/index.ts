export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  medications: string[];
  whatToDo: string;
}

export interface UnknownMedication {
  name: string;
  note: string;
}

export interface InteractionReport {
  unknownMedications: UnknownMedication[];
  interactions: Interaction[];
  recommendations: string[];
  questionsForDoctor: string[];
  warnings: string[];
}

export interface FormData {
  name: string;
  dosage: string;
  frequency: string;
} 