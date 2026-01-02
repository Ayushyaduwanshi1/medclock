import React, { useState } from 'react';
import { Users, Send, Search, Bell, Activity, Thermometer, Heart, ChevronRight, X } from 'lucide-react';

const DoctorMonitor = () => {
  const [patients] = useState([
    { id: 1, name: 'John Doe', age: 72, compliance: 85, lastUpdate: '2h ago', bp: '120/80', hr: '72 bpm' },
    { id: 2, name: 'Jane Smith', age: 68, compliance: 92, lastUpdate: '1h ago', bp: '135/85', hr: '84 bpm' },
    { id: 3, name: 'Bob Johnson', age: 75, compliance: 64, lastUpdate: '30m ago', bp: '145/95', hr: '90 bpm' }
  ]);

  const [instructions, setInstructions] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendInstruction = () => {
    if (instructions && selectedPatient) {
      alert(`Instruction sent to ${selectedPatient.name}: ${instructions}`);
      setInstructions('');
      setSelectedPatient(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Top Header */}
      <div className="bg-white border-b sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Users className="text-blue-600" /> Patient Monitoring
            </h2>
            <p className="text-slate-500 text-sm font-medium">Monitoring 3 active geriatric patients</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {patients.map(patient => (
            <div key={patient.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Patient Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-lg">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{patient.name}</h4>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                      Age: {patient.age} • Last: {patient.lastUpdate}
                    </p>
                  </div>
                </div>

                {/* Vitals Snapshot */}
                <div className="flex flex-wrap gap-3">
                  <VitalBadge icon={Heart} value={patient.hr} label="Pulse" color="rose" />
                  <VitalBadge icon={Activity} value={patient.bp} label="BP" color="blue" />
                </div>

                {/* Compliance Info */}
                <div className="flex items-center gap-8">
                  <div className="text-center min-w-[100px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Adherence</p>
                    <div className="flex items-center gap-2 justify-center">
                      <div className={`h-2 w-12 rounded-full bg-slate-100 overflow-hidden`}>
                        <div 
                          className={`h-full ${patient.compliance > 80 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                          style={{ width: `${patient.compliance}%` }}
                        />
                      </div>
                      <span className={`text-sm font-black ${patient.compliance > 80 ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {patient.compliance}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    <Send className="w-4 h-4" />
                    Instruct
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instruction Overlay Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedPatient(null)} />
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-4 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-800">New Instruction</h3>
                <p className="text-slate-400 text-sm">Direct message to <b>{selectedPatient.name}</b></p>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 pt-0 space-y-4">
              <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
                <Bell className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 font-medium">
                  Instructions will be pushed to the patient's mobile app immediately as a high-priority notification.
                </p>
              </div>
              
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Please increase water intake or skip the evening Aspirin..."
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-40 font-medium text-slate-700 transition-all"
              />
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleSendInstruction} 
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Confirm & Send
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-component for Vitlas
const VitalBadge = ({ icon: Icon, value, label, color }) => (
  <div className={`flex items-center gap-2 bg-${color}-50 px-4 py-2 rounded-xl`}>
    <Icon className={`w-4 h-4 text-${color}-600`} />
    <div className="leading-none">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{label}</p>
      <p className={`text-sm font-black text-${color}-700`}>{value}</p>
    </div>
  </div>
);

export default DoctorMonitor;