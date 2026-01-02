import React, { useState } from 'react';
import { Clock, Activity, Plus, Check, Pill, ArrowRight, ShieldAlert, Store } from 'lucide-react';

const HomePage = ({ userData, onNavigate }) => {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Aspirin', time: '08:00 AM', taken: true, dosage: '100mg' },
    { id: 2, name: 'Metformin', time: '02:00 PM', taken: false, dosage: '500mg' },
    { id: 3, name: 'Lisinopril', time: '08:00 PM', taken: false, dosage: '10mg' }
  ]);

  const toggleMedicineTaken = (id) => {
    setMedicines(medicines.map(med =>
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const takenCount = medicines.filter(m => m.taken).length;
  const progressPercent = (takenCount / medicines.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Dynamic Header Section */}
      <div className="bg-slate-900 text-white pt-10 pb-24 px-6 rounded-b-[3rem] shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                Hello, {userData?.name || 'Sandeep'}! 👋
              </h2>
              <p className="text-slate-400 mt-1 font-medium">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              <span>Daily Progress</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Content Area */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 space-y-6">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <StatBox label="Total" value={medicines.length} color="blue" icon={Pill} />
          <StatBox label="Done" value={takenCount} color="emerald" icon={Check} />
          <StatBox label="Left" value={medicines.length - takenCount} color="orange" icon={Clock} />
        </div>

        {/* Medication List Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-800">Today's Dose</h3>
              <p className="text-slate-400 text-sm font-bold">Don't miss a single pill</p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition-all shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {medicines.map(medicine => (
              <div 
                key={medicine.id} 
                className={`group flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-[0.98] ${
                  medicine.taken ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    medicine.taken ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Pill className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{medicine.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      {medicine.dosage} • {medicine.time}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleMedicineTaken(medicine.id)}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all uppercase tracking-widest ${
                    medicine.taken
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  }`}
                >
                  {medicine.taken ? 'Taken' : 'Take Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Big Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <ActionCard 
            title="Emergency Support" 
            desc="Ambulance & SOS Alerts" 
            color="rose" 
            icon={ShieldAlert} 
            onClick={() => onNavigate('emergency')} 
          />
          <ActionCard 
            title="Local Pharmacy" 
            desc="Shop medicines & supplies" 
            color="teal" 
            icon={Store} 
            onClick={() => onNavigate('shops')} 
          />
        </div>
      </div>
    </div>
  );
};

// Internal Sub-components for cleaner structure
const StatBox = ({ label, value, color, icon: Icon }) => (
  <div className="bg-white p-4 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-50 text-center">
    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-${color}-50 text-${color}-600`}>
      <Icon className="w-4 h-4" />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className={`text-2xl font-black text-slate-800`}>{value}</p>
  </div>
);

const ActionCard = ({ title, desc, color, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-5 p-6 rounded-[2rem] transition-all bg-white border border-slate-100 shadow-sm hover:shadow-xl group text-left`}
  >
    <div className={`p-4 rounded-2xl transition-colors bg-${color}-50 text-${color}-600 group-hover:bg-${color}-600 group-hover:text-white`}>
      <Icon className="w-7 h-7" />
    </div>
    <div className="flex-1">
      <h3 className="font-black text-slate-800 text-lg">{title}</h3>
      <p className="text-slate-400 text-sm font-medium">{desc}</p>
    </div>
    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
  </button>
);

export default HomePage;