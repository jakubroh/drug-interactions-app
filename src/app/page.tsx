'use client';

import { useState, useEffect } from 'react';
import { Plus, Brain, AlertTriangle } from 'lucide-react';
import { Medication, InteractionReport } from '@/types';
import { loadMedications, addMedication, updateMedication, deleteMedication } from '@/utils/storage';
import MedicationForm from '@/components/MedicationForm';
import MedicationList from '@/components/MedicationList';
import InteractionReportComponent from '@/components/InteractionReport';

export default function Home() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisReport, setAnalysisReport] = useState<InteractionReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Načtení léků při startu aplikace
  useEffect(() => {
    const loadedMedications = loadMedications();
    setMedications(loadedMedications);
  }, []);

  // Uložení léků při změně
  useEffect(() => {
    if (medications.length > 0) {
      const saveData = () => {
        const saveMedications = (meds: Medication[]) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('medications', JSON.stringify(meds));
          }
        };
        saveMedications(medications);
      };
      saveData();
    }
  }, [medications]);

  const handleAddMedication = async (data: { name: string; dosage: string; frequency: string }) => {
    const newMedication = addMedication(data);
    setMedications(prev => [...prev, newMedication]);
    setShowForm(false);
  };

  const handleEditMedication = async (data: { name: string; dosage: string; frequency: string }) => {
    if (!editingMedication) return;
    
    const updated = updateMedication(editingMedication.id, data);
    if (updated) {
      setMedications(prev => prev.map(med => med.id === editingMedication.id ? updated : med));
    }
    setEditingMedication(null);
  };

  const handleDeleteMedication = async (id: string) => {
    const success = deleteMedication(id);
    if (success) {
      setMedications(prev => prev.filter(med => med.id !== id));
    }
  };

  const handleStartEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingMedication(null);
  };

  const handleAnalyze = async () => {
    if (medications.length === 0) {
      setError('Pro analýzu je potřeba přidat alespoň jeden lék.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisReport(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medications }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Chyba při analýze');
      }

      const report = await response.json();
      setAnalysisReport(report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nastala neočekávaná chyba');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const medicationNames = medications.map(med => med.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Kontrola interakcí léků
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              {medications.length} léků v seznamu
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Bezpečnostní upozornění */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <h2 className="font-semibold text-red-800 mb-1">
                  Důležité upozornění
                </h2>
                <p className="text-red-700 text-sm">
                  Tato aplikace slouží pouze jako informativní nástroj a nenahrazuje lékařskou konzultaci. 
                  Vždy se poraďte se svým lékařem nebo lékárníkem před jakýmkoliv změnami v užívání léků.
                </p>
              </div>
            </div>
          </div>

          {/* Formulář pro přidání léku */}
          {showForm && (
            <MedicationForm
              onSubmit={handleAddMedication}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Formulář pro editaci */}
          {editingMedication && (
            <MedicationForm
              medication={editingMedication}
              onSubmit={handleEditMedication}
              onCancel={handleCancelEdit}
              isEditing={true}
            />
          )}

          {/* Tlačítko pro přidání léku */}
          {!showForm && !editingMedication && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Plus size={20} />
                Přidat nový lék
              </button>
            </div>
          )}

          {/* Seznam léků */}
          <MedicationList
            medications={medications}
            onEdit={handleStartEdit}
            onDelete={handleDeleteMedication}
          />

          {/* Tlačítko pro analýzu */}
          {medications.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzuji...
                  </>
                ) : (
                  <>
                    <Brain size={20} />
                    Analyzovat interakce
                  </>
                )}
              </button>
            </div>
          )}

          {/* Chybová zpráva */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Chyba</h3>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Výsledky analýzy */}
          {analysisReport && (
            <InteractionReportComponent
              report={analysisReport}
              medications={medicationNames}
            />
          )}
        </div>
      </main>
    </div>
  );
}
