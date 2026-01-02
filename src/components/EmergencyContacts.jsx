import React, { useState, useRef } from 'react';
import { AlertTriangle, Phone, Truck, ShieldCheck, MapPin, Navigation, Info } from 'lucide-react';

const EmergencyContacts = () => {
    const [isHolding, setIsHolding] = useState(false);
    const holdTimer = useRef(null);

    const hospitals = [
        { id: 1, name: "City General Hospital", dist: "1.2 km", phone: "911", status: "24/7 Open" },
        { id: 2, name: "St. Mary's Medical Center", dist: "3.5 km", phone: "911", status: "Emergency Only" },
        { id: 3, name: "Metro Trauma Center", dist: "5.8 km", phone: "911", status: "24/7 Open" },
    ];

    // Simulate a secure SOS trigger (Press and Hold)
    const startHold = () => {
        setIsHolding(true);
        holdTimer.current = setTimeout(() => {
            if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
            alert('CRITICAL: SOS Alert Sent! Your GPS location has been shared with emergency services.');
            setIsHolding(false);
        }, 1500); 
    };

    const endHold = () => {
        clearTimeout(holdTimer.current);
        setIsHolding(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-32 md:pb-12">
            <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
                
                {/* Visual Warning Banner */}
                <div className="bg-rose-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-rose-200 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertTriangle className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black tracking-tighter mb-2">SOS HELP</h2>
                        <p className="text-rose-100 font-bold opacity-90 uppercase tracking-widest text-xs">Emergency Services Only</p>
                    </div>
                </div>

                {/* Direct Dial Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <EmergencyActionCard 
                        label="Ambulance" 
                        number="102" 
                        icon={Truck} 
                        color="rose" 
                    />
                    <EmergencyActionCard 
                        label="Police" 
                        number="100" 
                        icon={ShieldCheck} 
                        color="blue" 
                    />
                </div>

                {/* Nearby Facilities */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-black text-slate-800 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-rose-600" />
                            Nearest Hospitals
                        </h3>
                        <span className="animate-pulse flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" /> Live
                        </span>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {hospitals.map((hospital) => (
                            <div key={hospital.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <h4 className="font-bold text-slate-800">{hospital.name}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                                            <Navigation className="w-3 h-3" /> {hospital.dist}
                                        </span>
                                        <span className="text-[10px] font-black text-rose-500 uppercase">{hospital.status}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a 
                                        href={`tel:${hospital.phone}`}
                                        className="bg-slate-900 text-white p-3 rounded-xl hover:bg-rose-600 transition shadow-lg active:scale-90"
                                    >
                                        <Phone className="w-5 h-5" />
                                    </a>
                                    <a 
                                        href={`https://www.google.com/maps/search/${encodeURIComponent(hospital.name)}`}
                                        target="_blank"
                                        className="bg-slate-100 text-slate-600 p-3 rounded-xl hover:bg-slate-200 transition active:scale-90"
                                    >
                                        <Navigation className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* First Aid Info Card */}
                <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <Info className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-900">First Aid Tip</h4>
                        <p className="text-sm text-blue-700 leading-snug mt-1">
                            In case of severe bleeding, apply firm, steady pressure to the wound with a clean cloth.
                        </p>
                    </div>
                </div>

                {/* Floating SOS Button (Mobile Optimized) */}
                <div className="fixed bottom-8 left-4 right-4 md:static md:mt-10">
                    <button
                        onMouseDown={startHold}
                        onMouseUp={endHold}
                        onMouseLeave={endHold}
                        onTouchStart={startHold}
                        onTouchEnd={endHold}
                        className={`w-full py-6 md:py-8 rounded-[2rem] font-black text-2xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 border-4 ${
                            isHolding 
                            ? 'bg-white text-rose-600 border-rose-600 scale-95' 
                            : 'bg-rose-600 text-white border-rose-200 hover:bg-rose-700'
                        }`}
                    >
                        <div className={`p-2 rounded-full ${isHolding ? 'bg-rose-50' : 'bg-white/20'}`}>
                            <AlertTriangle className={`w-8 h-8 ${isHolding ? 'animate-ping' : ''}`} />
                        </div>
                        {isHolding ? 'HOLDING...' : 'PANIC BUTTON'}
                    </button>
                    <p className="text-center text-slate-400 text-[10px] font-black uppercase tracking-tighter mt-4">
                        Press and hold for 1.5 seconds to broadcast your emergency
                    </p>
                </div>
            </div>
        </div>
    );
};

const EmergencyActionCard = ({ label, number, icon: Icon, color }) => {
    const colorClasses = {
        rose: "border-rose-600 bg-rose-50 text-rose-600",
        blue: "border-blue-600 bg-blue-50 text-blue-600"
    };

    return (
        <a 
            href={`tel:${number}`}
            className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 bg-white shadow-sm hover:shadow-xl transition-all active:scale-95 group border-b-8 ${colorClasses[color].split(' ')[0]}`}
        >
            <div className={`p-4 rounded-2xl mb-3 transition-colors ${colorClasses[color].split(' ').slice(1).join(' ')} group-hover:bg-slate-900 group-hover:text-white`}>
                <Icon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <span className="text-2xl font-black text-slate-800">{number}</span>
        </a>
    );
};

export default EmergencyContacts;