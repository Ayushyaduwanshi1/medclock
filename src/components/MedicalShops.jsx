import React, { useState } from 'react';
import { ShoppingBag, MapPin, Phone, ExternalLink, Clock, Search, Navigation } from 'lucide-react';

const MedicalShops = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const shops = [
        { id: 1, name: 'City Care Pharmacy', address: '123 Main St, Downtown', distance: '0.5 km', phone: '+1-234-567-8901', open: '24/7', status: 'Open Now', is247: true },
        { id: 2, name: 'Green Cross Medicals', address: '456 Oak Ave, Westside', distance: '1.2 km', phone: '+1-234-567-8902', open: '8:00 AM - 10:00 PM', status: 'Open Now', is247: false },
        { id: 3, name: 'Wellness Chemist', address: '789 Pine Rd, Northgate', distance: '2.5 km', phone: '+1-234-567-8903', open: '9:00 AM - 9:00 PM', status: 'Closing Soon', is247: false },
        { id: 4, name: 'Health First Pharmacy', address: '321 Elm St, Eastside', distance: '3.8 km', phone: '+1-234-567-8904', open: '24/7', status: 'Open Now', is247: true }
    ];

    const filteredShops = shops.filter(shop => 
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 pt-10 pb-20 px-4 rounded-b-[3rem] shadow-xl">
                <div className="max-w-6xl mx-auto text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Pharmacies</h2>
                            <p className="text-teal-100 opacity-90 font-medium">Find medicines & supplies nearby</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mt-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search by name or area..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-800 font-medium focus:ring-4 focus:ring-teal-500/30 outline-none shadow-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredShops.map(shop => (
                        <div key={shop.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-black text-slate-800 group-hover:text-teal-600 transition-colors">{shop.name}</h3>
                                        {shop.is247 && (
                                            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">24/7</span>
                                        )}
                                    </div>
                                    <p className="text-slate-500 text-sm flex items-start gap-1">
                                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        {shop.address}
                                    </p>
                                </div>
                                <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-xl text-xs font-black whitespace-nowrap">
                                    {shop.distance}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl">
                                    <Clock className="w-4 h-4 text-teal-500" />
                                    <div className="leading-tight">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Hours</p>
                                        <p className="text-xs font-bold">{shop.open}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl">
                                    <Phone className="w-4 h-4 text-teal-500" />
                                    <div className="leading-tight">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Contact</p>
                                        <p className="text-xs font-bold">{shop.phone.split('-').pop()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <a 
                                    href={`tel:${shop.phone}`}
                                    className="flex-1 bg-teal-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    CALL
                                </a>
                                <a 
                                    href={`https://www.google.com/maps/search/${encodeURIComponent(shop.name + ' ' + shop.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Navigation className="w-4 h-4" />
                                    DIRECTIONS
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredShops.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-slate-400 w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No pharmacies found</h3>
                        <p className="text-slate-500">Try searching for a different name or street</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalShops;