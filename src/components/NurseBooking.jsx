import React, { useState } from 'react';
import { User, Calendar, Clock, Star, Phone, CheckCircle, Heart, ChevronRight, ShieldCheck } from 'lucide-react';

const NurseBooking = () => {
    const [selectedNurse, setSelectedNurse] = useState(null);
    const [duration, setDuration] = useState('1 day');
    const [startDate, setStartDate] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const nurses = [
        { id: 1, name: 'Jessica Brown', specialty: 'Elderly Care', experience: '8y', rating: 4.9, rate: 50, img: 'JB' },
        { id: 2, name: 'David Wilson', specialty: 'Post-Surgery', experience: '5y', rating: 4.7, rate: 60, img: 'DW' },
        { id: 3, name: 'Sarah Lee', specialty: 'Pediatric Care', experience: '10y', rating: 4.8, rate: 55, img: 'SL' },
        { id: 4, name: 'Michael Chen', specialty: 'General Nursing', experience: '6y', rating: 4.6, rate: 45, img: 'MC' }
    ];

    const durations = ['1 day', '3 days', '1 week', '2 weeks', '1 month'];

    const handleBookNurse = () => {
        if (selectedNurse && startDate) {
            setShowSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                setShowSuccess(false);
                setSelectedNurse(null);
                setStartDate('');
            }, 4000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-10">
            {/* Header */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 pt-8 pb-12 px-4 rounded-b-[2rem] shadow-lg">
                <div className="max-w-6xl mx-auto flex items-center justify-between text-white">
                    <div>
                        <h2 className="text-3xl font-black flex items-center gap-2">
                            <Heart className="w-8 h-8 fill-white" />
                            CareSelect
                        </h2>
                        <p className="text-rose-100 mt-1 opacity-90">Verified Professional Home Nursing</p>
                    </div>
                    <div className="hidden md:flex bg-white/20 p-2 rounded-full backdrop-blur-md">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-8">
                {showSuccess && (
                    <div className="bg-green-500 text-white p-4 mb-6 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <p className="font-bold">Booking confirmed! Jessica will arrive on {startDate}.</p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="font-bold text-slate-800 text-xl">Top Rated Nurses</h3>
                            <button className="text-rose-600 text-sm font-bold">Filter</button>
                        </div>
                        
                        <div className="grid gap-4">
                            {nurses.map(nurse => (
                                <div
                                    key={nurse.id}
                                    onClick={() => setSelectedNurse(nurse)}
                                    className={`group relative overflow-hidden bg-white p-5 rounded-3xl border-2 transition-all cursor-pointer active:scale-[0.98] ${
                                        selectedNurse?.id === nurse.id
                                            ? 'border-rose-500 ring-4 ring-rose-100'
                                            : 'border-transparent hover:border-rose-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-bold text-xl ${
                                            selectedNurse?.id === nurse.id ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {nurse.img}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-black text-slate-800 text-lg md:text-xl">{nurse.name}</h4>
                                                <span className="font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-sm">
                                                    ${nurse.rate}/d
                                                </span>
                                            </div>
                                            <p className="text-slate-500 font-medium text-sm md:text-base">{nurse.specialty}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                                    <Clock className="w-3.5 h-3.5" /> {nurse.experience}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                                                    <Star className="w-3.5 h-3.5 fill-current" /> {nurse.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-6 h-6 transition-transform ${selectedNurse?.id === nurse.id ? 'text-rose-500 translate-x-1' : 'text-slate-300'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-8 border border-slate-100 sticky top-6">
                            {selectedNurse ? (
                                <>
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-black text-slate-800">Review Booking</h3>
                                        <p className="text-slate-400 text-sm">Secure and fast checkout</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full mt-2 px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-rose-500 font-bold text-slate-700 outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {durations.map(d => (
                                                    <button
                                                        key={d}
                                                        onClick={() => setDuration(d)}
                                                        className={`flex-1 min-w-[80px] py-3 rounded-xl font-bold text-xs transition-all ${
                                                            duration === d
                                                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                                        }`}
                                                    >
                                                        {d}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-dashed border-slate-200">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-slate-400 font-bold">Total Estimate</span>
                                                <span className="text-3xl font-black text-slate-800">${selectedNurse.rate * (duration === '1 day' ? 1 : 7)}</span>
                                            </div>
                                            <button
                                                onClick={handleBookNurse}
                                                disabled={!startDate}
                                                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-rose-600 shadow-xl shadow-slate-200 transition-all disabled:opacity-30 flex items-center justify-center gap-2"
                                            >
                                                Confirm Booking
                                            </button>
                                            <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-tighter">
                                                Free cancellation up to 24h before
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <User className="w-10 h-10 text-rose-300" />
                                    </div>
                                    <h4 className="font-bold text-slate-800">No Selection</h4>
                                    <p className="text-slate-400 text-sm px-10">Select a professional from the list to see availability</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseBooking;