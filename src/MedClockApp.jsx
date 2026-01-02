import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/HomePage';
import PatientDashboard from './components/PatientDashboard';
import DoctorMonitor from './components/DoctorMonitor';
import AIChatbot from './components/AIChatbot';
import Navigation from './components/Navigation';
import DoctorAppointment from './components/DoctorAppointment';
import NurseBooking from './components/NurseBooking';
import MedicalShops from './components/MedicalShops';
import EmergencyContacts from './components/EmergencyContacts';

const MedClockApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'patient' or 'doctor'
  const [userData, setUserData] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = (phone, password, role) => {
    // In production, this would be a fetch() to /api/login
    setUserData({
      name: role === 'patient' ? 'Sandeep Kumar' : 'Dr. Arvind Smith',
      phone: phone,
      role: role,
      avatar: null 
    });
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleRegister = (formData) => {
    setUserData({
      name: formData.name,
      phone: formData.phone,
      role: formData.role
    });
    setUserRole(formData.role);
    setIsLoggedIn(true);
    setCurrentPage('home');
    setShowRegistration(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setUserRole('');
    setCurrentPage('login');
  };

  // Auth Guard: If not logged in, show Auth screens
  if (!isLoggedIn) {
    return showRegistration ? (
      <RegistrationForm 
        handleRegister={handleRegister} 
        onBackToLogin={() => setShowRegistration(false)} 
      />
    ) : (
      <LoginPage 
        handleLogin={handleLogin} 
        onShowRegister={() => setShowRegistration(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Persistent Navigation */}
      <Navigation 
        userRole={userRole} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        handleLogout={handleLogout} 
        userName={userData?.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300 ease-in-out">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {currentPage === 'home' && (
            <HomePage userData={userData} onNavigate={setCurrentPage} />
          )}
          
          {/* Patient-Specific Routes */}
          {userRole === 'patient' && (
            <>
              {currentPage === 'dashboard' && <PatientDashboard />}
              {currentPage === 'appointment' && <DoctorAppointment />}
              {currentPage === 'nurse' && <NurseBooking />}
              {currentPage === 'shops' && <MedicalShops />}
            </>
          )}

          {/* Doctor-Specific Routes */}
          {userRole === 'doctor' && (
            <>
              {currentPage === 'monitor' && <DoctorMonitor />}
            </>
          )}

          {/* Shared Routes */}
          {currentPage === 'chat' && <AIChatbot />}
          {currentPage === 'emergency' && <EmergencyContacts />}
        </div>
      </main>

      {/* Mobile-Friendly Bottom Padding for Navigation if needed */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default MedClockApp;