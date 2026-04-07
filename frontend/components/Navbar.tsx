import React from "react";
import { SunIcon, MoonIcon, BellIcon, SearchIcon } from "./Icons";

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export function Navbar({ toggleTheme, isDark }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-[#1C1715]/90 backdrop-blur-md border-b border-[#F0E5D8] dark:border-[#3D332D] z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E06A3B] to-[#C65B30] rounded-xl flex justify-center items-center text-white shadow-sm shadow-[#E06A3B]/40">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2D231F] dark:text-[#EFEBE8]">Oficio<span className="text-[#E06A3B]">Red</span></span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-[#A39891]"><SearchIcon /></span>
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-[#FCF8F4] dark:bg-[#26201D] text-[#2D231F] dark:text-[#EFEBE8] placeholder-[#A39891] focus:ring-2 focus:ring-[#E06A3B]/50 transition-colors outline-none" 
              placeholder="Buscar oficios, personas, empleos..." 
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FDFBFA] dark:hover:bg-[#26201D] transition-colors">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="hidden sm:block p-2 rounded-full text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FDFBFA] dark:hover:bg-[#26201D] transition-colors">
              <BellIcon />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#E06A3B] ml-2 cursor-pointer transition-transform hover:scale-105">
              <img src="https://i.pravatar.cc/150?u=99" alt="User Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
