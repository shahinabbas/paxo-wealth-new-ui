import React, { useState } from 'react';
import MobileMenuButton from './MobileMenuButton';
import DashboardSidebar from './DashboardSidebar';


const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-customBlue pt-16"> {/* Added pt-16 for navbar space */}
      <MobileMenuButton 
        isOpen={isMobileMenuOpen} 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      <div className="flex">
        <DashboardSidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
        <main className="flex-1 transition-all duration-200 md:ml-64 min-h-screen">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;