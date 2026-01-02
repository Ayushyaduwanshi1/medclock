import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Plus, X, Pill, CheckCircle2, MoreHorizontal, AlertCircle } from 'lucide-react';

const PatientDashboard = () => {
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null); // Alert popup state
  
  // Initial state for medicines
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Aspirin 100mg', time: '08:00', status: 'taken', color: 'blue' },
    { id: 2, name: 'Metformin 500mg', time: '14:00', status: 'upcoming', color: 'emerald' },
    { id: 3, name: 'Lisinopril 10mg', time: '20:00', status: 'upcoming', color: 'orange' }
  ]);

  const [newMedicine, setNewMedicine] = useState({ name: '', dosage: '', time: '', frequency: 'daily' });

  // --- REAL-TIME ALERT LOGIC ---
  useEffect(() => {
    // Browser Notifications Permission Request
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    const checkTime = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      medicines.forEach(med => {
        // Agar time match hota hai aur dawai abhi tak li nahi gayi hai
        if (med.time === currentTime && med.status !== 'taken') {
          triggerAlert(med);
        }
      });
    }, 1000 * 60); // Har 1 minute mein check karega

    return () => clearInterval(checkTime);
  }, [medicines]);

  const triggerAlert = (med) => {
    // 1. Browser Push Notification
    if (Notification.permission === "granted") {
      new Notification(`MedClock: Time for ${med.name}`, {
        body: `It's ${med.time}. Please take your dosage now.`,
        icon: "/logo.png" 
      });
    }

    // 2. In-App Visual Popup
    setActiveAlert(med);
    
    // 3. Play sound (Optional)
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log("Audio play blocked"));
  };

  const handleTakeMedicine = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? {...m, status: 'taken'} : m));
    setActiveAlert(null);
  };

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.time) {
      const newMed = {
        id: Date.now(),
        name: `${newMedicine.name} ${newMedicine.dosage}`,
        time: newMedicine.time,
        status: 'upcoming',
        color: 'blue'
      };
      setMedicines([...medicines, newMed]);
      setShowAddMedicine(false);
      setNewMedicine({ name: '', dosage: '', time: '', frequency: 'daily' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* ALERT MODAL (Jab time ho jaye) */}
      {activeAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl animate-bounce">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-600 animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Dose Reminder!</h3>
            <p className="text-slate-500 mt-2 font-bold">It's time for <span className="text-blue-600">{activeAlert.name}</span></p>
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => handleTakeMedicine(activeAlert.id)}
                className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-200"
              >
                I'VE TAKEN IT
              </button>
              <button 
                onClick={() => setActiveAlert(null)}
                className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-bold"
              >
                REMIND IN 5 MIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-slate-900 text-white pt-10 pb-20 px-6 rounded-b-[2.5rem]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Health Hub</h2>
            <p className="text-slate-400 text-sm mt-1 uppercase font-bold tracking-widest">Time: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md relative">
            <Bell className="w-6 h-6 text-slate-300" />
            {medicines.some(m => m.status === 'upcoming') && <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></div>}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Adherence" value={`${Math.round((medicines.filter(m => m.status === 'taken').length / medicines.length) * 100)}%`} color="text-blue-600" />
          <StatCard label="Total Meds" value={medicines.length} color="text-emerald-600" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Today's Schedule
              </h3>
              <button 
                onClick={() => setShowAddMedicine(true)}
                className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 hover:scale-110 transition-transform"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {medicines.map((med) => (
                <div key={med.id} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${med.status === 'taken' ? 'bg-emerald-50' : 'bg-blue-50'}`}>
                      <Pill className={`w-6 h-6 ${med.status === 'taken' ? 'text-emerald-500' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{med.time}</p>
                      <h4 className={`font-bold text-lg ${med.status === 'taken' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{med.name}</h4>
                    </div>
                  </div>
                  {med.status === 'taken' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : (
                    <button onClick={() => handleTakeMedicine(med.id)} className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-black text-blue-600 uppercase hover:bg-blue-600 hover:text-white transition-all">Take Now</button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Notifications Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 px-2 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              Alert Settings
            </h3>
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <p className="p-5 text-xs text-slate-400 font-bold uppercase">System will alert you at exact medicine time.</p>
              <ToggleRow label="Push Notifications" defaultChecked />
              <ToggleRow label="Sound Alerts" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* Add Medicine Modal (Same as before but with working state) */}
      {showAddMedicine && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddMedicine(false)} />
          <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 relative z-10 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-slate-800">Add Medicine</h3>
              <button onClick={() => setShowAddMedicine(false)} className="p-2 bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-5">
              <InputField label="Medicine Name" placeholder="e.g. Paracetamol" value={newMedicine.name} onChange={(v) => setNewMedicine({...newMedicine, name: v})} />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Dosage" placeholder="500mg" value={newMedicine.dosage} onChange={(v) => setNewMedicine({...newMedicine, dosage: v})} />
                <InputField label="Time (24h format)" type="time" value={newMedicine.time} onChange={(v) => setNewMedicine({...newMedicine, time: v})} />
              </div>
              <button onClick={handleAddMedicine} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl mt-4">
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ... (StatCard, ToggleRow, InputField components same as original)
const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-5 rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
  </div>
);

const ToggleRow = ({ label, defaultChecked }) => (
  <div className="flex items-center justify-between p-5 border-b border-slate-50 last:border-none">
    <span className="font-bold text-slate-700">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-[1.3rem] after:w-[1.3rem] after:transition-all peer-checked:bg-emerald-500 shadow-inner"></div>
    </label>
  </div>
);

const InputField = ({ label, type="text", placeholder, value, onChange }) => (
  <div>
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 block mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 outline-none transition-all"
    />
  </div>
);

export default PatientDashboard;