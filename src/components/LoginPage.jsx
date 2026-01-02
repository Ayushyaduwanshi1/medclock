import React, { useState } from 'react';
import { Phone, Lock, UserCircle, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import logo from '../assets/logo.jpg';

const LoginPage = ({ handleLogin, onShowRegister }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state add kiya

  const onLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone || !password) {
      setErrorMsg("Please enter both phone and password");
      return;
    }

    // Loading start karein
    setIsLoading(true);

    // Simulation: 1.5 seconds ka delay taaki loading dikhe
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem('medclock_users') || '[]');
      const userFound = registeredUsers.find(
        (u) => u.phone === phone && u.password === password && u.role === role
      );

      if (userFound) {
        handleLogin(phone, password, role);
      } else {
        setErrorMsg("Invalid credentials! Please check your details or Register.");
        setIsLoading(false); // Error aane par loading stop karein
      }
    }, 1500); 
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl flex flex-col items-center gap-4 border border-slate-100 animate-in zoom-in-95 duration-200">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="font-black text-slate-800 tracking-tight">Verifying Identity...</p>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden border border-slate-100">
        
        {/* Branding Area */}
        <div className="pt-10 pb-6 px-8 text-center">
          <div className="inline-block p-4 bg-slate-50 rounded-3xl mb-4 transition-transform hover:scale-105">
            <img 
              src={logo} 
              alt="MedClock Logo" 
              className="w-48 h-auto object-contain" 
            />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Accessing your secure portal</p>
        </div>

        <form onSubmit={onLogin} className="px-8 pb-10 space-y-5">
          
          {/* Role Selection */}
          <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setRole('patient')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === 'patient' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
              }`}
            >
              <UserCircle className="w-4 h-4" /> Patient
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setRole('doctor')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === 'doctor' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Doctor
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-100">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Phone Number</label>
              <input
                type="tel"
                disabled={isLoading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-bold text-slate-700 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Password</label>
              <input
                type="password"
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-bold text-slate-700 disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl text-white font-black text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
              isLoading ? 'bg-slate-300' : (role === 'patient' ? 'bg-blue-600 shadow-blue-100 hover:bg-blue-700' : 'bg-emerald-600 shadow-emerald-100 hover:bg-emerald-700')
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <div className="px-8 pb-10 text-center border-t border-slate-50 pt-6">
          <p className="text-slate-400 text-sm font-bold">
            New to MedClock?{' '}
            <button
              onClick={onShowRegister}
              className="text-blue-600 hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;