'use client';

import { Printer, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { InteractionReport as ReportType } from '@/types';

interface InteractionReportProps {
  report: ReportType;
  medications: string[];
  onPrint?: () => void;
}

const severityConfig = {
  low: { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle },
  medium: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: AlertCircle },
  high: { color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertTriangle },
  critical: { color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertTriangle },
};

const severityLabels = {
  low: 'Nízké riziko',
  medium: 'Střední riziko',
  high: 'Vysoké riziko',
  critical: 'Kritické riziko',
};

export default function InteractionReport({ report, medications, onPrint }: InteractionReportProps) {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 print:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 print:mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analýza interakcí léků
          </h2>
          <p className="text-gray-600">
            Analyzováno {medications.length} léků • {new Date().toLocaleDateString('cs-CZ')}
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors print:hidden"
        >
          <Printer size={16} />
          Tisknout
        </button>
      </div>

      {/* Bezpečnostní upozornění */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">
              Důležité upozornění
            </h3>
            <p className="text-red-700 text-sm">
              Tato analýza nenahrazuje lékařskou konzultaci. Vždy se poraďte se svým lékařem 
              nebo lékárníkem před jakýmkoliv změnami v užívání léků. V případě urgentních 
              zdravotních problémů kontaktujte lékaře nebo volejte 155.
            </p>
          </div>
        </div>
      </div>

      {/* Neznámé léky */}
      {report.unknownMedications && report.unknownMedications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Neznámé léky
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="text-yellow-800 text-sm font-medium mb-2">
                  Následující léky nebyly rozpoznány:
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {report.unknownMedications.map((med, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-yellow-800 text-sm font-medium">{med.name}</span>
                    <p className="text-yellow-700 text-sm">{med.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Interakce */}
      {report.interactions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Identifikované interakce
          </h3>
          <div className="space-y-3">
            {report.interactions.map((interaction, index) => {
              const config = severityConfig[interaction.severity];
              const Icon = config.icon;
              
              return (
                <div
                  key={index}
                  className={`${config.bgColor} border border-gray-200 rounded-lg p-4`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`${config.color} mt-0.5 flex-shrink-0`} size={20} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-sm font-medium ${config.color}`}>
                          {severityLabels[interaction.severity]}
                        </span>
                        <span className="text-xs text-gray-500">
                          {interaction.medications.join(' + ')}
                        </span>
                      </div>
                      <p className="text-gray-800 text-sm mb-2">
                        {interaction.description}
                      </p>
                      {interaction.whatToDo && (
                        <div className="bg-white bg-opacity-50 rounded p-3 border-l-4 border-blue-400">
                          <p className="text-sm font-medium text-blue-800 mb-1">
                            Co dělat:
                          </p>
                          <p className="text-blue-700 text-sm">
                            {interaction.whatToDo}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Doporučení */}
      {report.recommendations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Doporučení pro pacienta
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2">
              {report.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-blue-800 text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Otázky pro lékaře */}
      {report.questionsForDoctor.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Otázky pro lékaře
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <ul className="space-y-2">
              {report.questionsForDoctor.map((question, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-green-800 text-sm">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Upozornění */}
      {report.warnings.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Upozornění
          </h3>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <ul className="space-y-2">
              {report.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-orange-800 text-sm">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4 mt-6">
        <p className="text-xs text-gray-500 text-center">
          Tato analýza byla generována pomocí AI a slouží pouze jako informativní materiál. 
          Vždy se poraďte s odborným lékařem.
        </p>
      </div>
    </div>
  );
} 