import React, { useState } from 'react';
import { User, Phone, Mail, Lock, MapPin, Calendar, ArrowLeft, ShieldAlert, UserCircle } from 'lucide-react';

const RegistrationForm = ({ handleRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    address: '',
    dateOfBirth: '',
    gender: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Standard 10 digit Indian phone check

    if (!formData.name.trim()) newErrors.name = 'Full name required';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit number';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email required';
    if (formData.password.length < 6) newErrors.password = 'Min. 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords mismatch';
    if (!formData.address.trim()) newErrors.address = 'Address required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'DOB required';
    if (!formData.gender) newErrors.gender = 'Select gender';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Required';
    if (!phoneRegex.test(formData.emergencyPhone)) newErrors.emergencyPhone = 'Valid phone required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // --- LOCAL STORAGE LOGIC ---
      
      // 1. Pehle se saved users ki list mangwao
      const existingUsers = JSON.parse(localStorage.getItem('medclock_users') || '[]');

      // 2. Check karo ki ye phone number pehle se toh nahi hai
      const isDuplicate = existingUsers.some(user => user.phone === formData.phone);

      if (isDuplicate) {
        setErrors({ phone: 'This number is already registered' });
        alert("This phone number is already registered. Please login.");
        return;
      }

      // 3. Naya user list mein add karo
      const updatedUsers = [...existingUsers, formData];
      
      // 4. Dobara LocalStorage mein save kar do
      localStorage.setItem('medclock_users', JSON.stringify(updatedUsers));

      // 5. Parent (App.js) ko notification bhejo
      handleRegister(formData);
      
      alert('Registration Successful! Welcome to MedClock.');
    } else {
      // Error hone par scroll up karo
      const formContainer = document.getElementById('form-scroll-container');
      if (formContainer) formContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-2xl sm:rounded-3xl shadow-2xl flex flex-col h-screen sm:h-auto sm:max-h-[95vh] overflow-hidden">
        
        {/* Sticky Header */}
        <div className="p-6 bg-white border-b flex items-center justify-between shrink-0">
          <button onClick={onBackToLogin} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">Create Account</h1>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">MedClock Health System</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Scrollable Form Body */}
        <div id="form-scroll-container" className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
          
          <form onSubmit={handleSubmit} className="space-y-6 pb-10">
            
            {/* Role Selection */}
            <div className="bg-slate-50 p-4 rounded-2xl">
              <label className="text-xs font-black text-slate-400 uppercase mb-3 block text-center">Registering as a:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                    formData.role === 'patient' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                    formData.role === 'doctor' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white text-slate-500 border'
                  }`}
                >
                  Doctor
                </button>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-slate-800 uppercase tracking-wider">
                <UserCircle className="w-4 h-4 text-blue-500" /> Personal Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon={User} label="Full Name" name="name" value={formData.name} error={errors.name} onChange={handleChange} placeholder="John Doe" />
                <InputGroup icon={Phone} label="Phone Number" name="phone" type="tel" value={formData.phone} error={errors.phone} onChange={handleChange} placeholder="9876543210" />
              </div>

              <InputGroup icon={Mail} label="Email Address" name="email" type="email" value={formData.email} error={errors.email} onChange={handleChange} placeholder="john@example.com" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon={Lock} label="Password" name="password" type="password" value={formData.password} error={errors.password} onChange={handleChange} placeholder="••••••" />
                <InputGroup icon={Lock} label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} error={errors.confirmPassword} onChange={handleChange} placeholder="••••••" />
              </div>
            </div>

            {/* Address & DOB */}
            <div className="space-y-4 pt-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup icon={Calendar} label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} error={errors.dateOfBirth} onChange={handleChange} />
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full mt-1 px-4 py-3 bg-slate-50 border-2 rounded-xl focus:ring-2 outline-none ${
                        errors.gender ? 'border-red-400' : 'border-transparent focus:ring-blue-500'
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.gender}</p>}
                  </div>
               </div>
               <InputGroup icon={MapPin} label="Full Address" name="address" value={formData.address} error={errors.address} onChange={handleChange} placeholder="Street, City, Zip" isTextArea />
            </div>

            {/* Emergency Info */}
            <div className="bg-rose-50 p-6 rounded-3xl space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-rose-600 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" /> Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Contact Name" name="emergencyContact" value={formData.emergencyContact} error={errors.emergencyContact} onChange={handleChange} placeholder="Relative Name" />
                <InputGroup label="Contact Phone" name="emergencyPhone" type="tel" value={formData.emergencyPhone} error={errors.emergencyPhone} onChange={handleChange} placeholder="911-XXX" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-600 transition-all active:scale-[0.98]"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ icon: Icon, label, name, type = "text", value, error, onChange, placeholder, isTextArea = false }) => (
  <div className="w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-1">
      {Icon && <Icon className="w-3 h-3" />} {label}
    </label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="2"
        className={`w-full mt-1 px-4 py-3 bg-slate-50 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
          error ? 'border-red-400' : 'border-transparent focus:ring-blue-500'
        }`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full mt-1 px-4 py-3 bg-slate-50 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
          error ? 'border-red-400' : 'border-transparent focus:ring-blue-500'
        }`}
      />
    )}
    {error && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{error}</p>}
  </div>
);

export default RegistrationForm;