import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Video, Stethoscope, MapPin, CheckCircle, Star, ArrowRight, X } from 'lucide-react';

const DoctorAppointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: '15y+', rating: 4.8, reviews: 124, phone: '+1-234-567-8901' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Physician', experience: '12y+', rating: 4.9, reviews: 89, phone: '+1-234-567-8902' },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrician', experience: '10y+', rating: 4.7, reviews: 256, phone: '+1-234-567-8903' },
    { id: 4, name: 'Dr. Lisa Anderson', specialty: 'Neurologist', experience: '20y+', rating: 4.9, reviews: 142, phone: '+1-234-567-8905' }
  ];

  const timeSlots = ['09:00 AM', '10:30 AM', '11:00 AM', '01:30 PM', '02:00 PM', '04:30 PM'];

  const handleBookAppointment = () => {
    setShowSuccess(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <div className="bg-slate-900 pt-12 pb-24 px-6 rounded-b-[3rem]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Stethoscope className="text-blue-500 w-8 h-8" />
              Book Consultation
            </h2>
            <p className="text-slate-400 mt-1 font-medium">Find and book expert care in minutes</p>
          </div>
          {selectedDoctor && (
            <button onClick={() => setSelectedDoctor(null)} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold">
              <X className="w-4 h-4" /> Change Doctor
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Booking Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {!selectedDoctor ? (
              <div className="grid gap-4">
                <h3 className="text-xl font-black text-slate-800 px-2">Available Specialists</h3>
                {doctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <User className="w-10 h-10 text-slate-300 group-hover:text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-black text-slate-800 text-xl">{doctor.name}</h4>
                            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">{doctor.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-black text-amber-700">{doctor.rating}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {doctor.experience}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> Medical Plaza</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                
                {/* Date Selection */}
                <section>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">1. Select Preferred Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 outline-none transition-all"
                  />
                </section>

                {/* Time Slot Selection */}
                <section>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">2. Select Available Slot</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-4 rounded-2xl font-black text-xs transition-all ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Mode Selection */}
                <section>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">3. Consultation Mode</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setAppointmentType('in-person')}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                        appointmentType === 'in-person' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'
                      }`}
                    >
                      <MapPin className="w-4 h-4" /> In-Person
                    </button>
                    <button
                      onClick={() => setAppointmentType('video')}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm transition-all border-2 ${
                        appointmentType === 'video' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'
                      }`}
                    >
                      <Video className="w-4 h-4" /> Video Call
                    </button>
                  </div>
                </section>

                {/* Reason Field */}
                <section>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">4. Reason for visit</label>
                  <textarea
                    rows="3"
                    placeholder="Short description of your symptoms..."
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium text-slate-700 outline-none transition-all"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </section>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50 sticky top-8">
              <h3 className="font-black text-slate-800 text-xl mb-6">Booking Summary</h3>
              
              {selectedDoctor ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase">Provider</p>
                      <p className="font-bold text-slate-800">{selectedDoctor.name}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Date</span>
                      <span className="text-slate-800 font-black">{selectedDate || '--'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Time</span>
                      <span className="text-slate-800 font-black">{selectedTime || '--'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Type</span>
                      <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest">{appointmentType}</span>
                    </div>
                  </div>

                  <hr className="border-slate-50" />

                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleBookAppointment}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                  >
                    Confirm Booking
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Stethoscope className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold text-sm">Please select a doctor to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md bg-slate-900/60">
          <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Confirmed!</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">Your appointment is scheduled. We've sent a confirmation to your phone.</p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment ID</p>
              <p className="font-black text-slate-800 tracking-tighter text-lg">MED-{Math.floor(Math.random() * 90000) + 10000}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;