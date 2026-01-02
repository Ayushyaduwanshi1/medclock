import React, { useState } from 'react';
import { 
  Home, Activity, MessageCircle, LogOut, Calendar, 
  Heart, ShoppingBag, AlertTriangle, Menu, X 
} from 'lucide-react';
import logo from '../assets/mediclock.png';

const Navigation = ({ userRole, currentPage, setCurrentPage, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = userRole === 'doctor'
    ? [
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'monitor', icon: Activity, label: 'Monitor' },
      { id: 'chat', icon: MessageCircle, label: 'AI Chat' }
    ]
    : [
      { id: 'home', icon: Home, label: 'Home' },
      { id: 'dashboard', icon: Activity, label: 'Dashboard' },
      { id: 'appointment', icon: Calendar, label: 'Appoint.' }, // Shortened for mobile fit
      { id: 'nurse', icon: Heart, label: 'Nurse' },
      { id: 'shops', icon: ShoppingBag, label: 'Shops' },
      { id: 'emergency', icon: AlertTriangle, label: 'Emergency' },
      { id: 'chat', icon: MessageCircle, label: 'AI Chat' }
    ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setIsMenuOpen(false); // Close menu on mobile after selection
  };

  return (
    <nav className="bg-white fixed shadow-md sticky top-0 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src={logo} alt="MedClock" className="h-[260px]  w-[300px] rounded-lg" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-200 group ${
                  currentPage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 mb-0.5 ${currentPage === item.id ? 'scale-110' : ''}`} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
            
            <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-bold text-sm">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <span className="text-xl font-black text-blue-600">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2"><X className="w-6 h-6" /></button>
          </div>

          <div className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-6 h-6" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;