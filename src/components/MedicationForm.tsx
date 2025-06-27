'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Save, X } from 'lucide-react';
import { Medication } from '@/types';

const medicationSchema = z.object({
  name: z.string().min(2, 'Název léku musí mít alespoň 2 znaky'),
  dosage: z.string().min(1, 'Dávka je povinná'),
  frequency: z.string().min(1, 'Frekvence je povinná'),
});

type MedicationFormData = z.infer<typeof medicationSchema>;

interface MedicationFormProps {
  medication?: Medication;
  onSubmit: (data: MedicationFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function MedicationForm({ 
  medication, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: MedicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: medication ? {
      name: medication.name,
      dosage: medication.dosage,
      frequency: medication.frequency,
    } : {
      name: '',
      dosage: '',
      frequency: '',
    },
  });

  const handleFormSubmit = async (data: MedicationFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (!isEditing) {
        reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Upravit lék' : 'Přidat nový lék'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Název léku *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Např. Paralen, Ibalgin..."
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
            Dávka *
          </label>
          <input
            {...register('dosage')}
            type="text"
            id="dosage"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dosage ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Např. 500mg, 1 tableta..."
          />
          {errors.dosage && (
            <p className="mt-1 text-sm text-red-600">{errors.dosage.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
            Frekvence užívání *
          </label>
          <input
            {...register('frequency')}
            type="text"
            id="frequency"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.frequency ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Např. 3x denně, každých 8 hodin..."
          />
          {errors.frequency && (
            <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isEditing ? (
              <>
                <Save size={16} />
                Uložit změny
              </>
            ) : (
              <>
                <Plus size={16} />
                Přidat lék
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
} 