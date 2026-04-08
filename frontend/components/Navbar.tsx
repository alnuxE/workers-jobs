"use client";

import React, { useState } from "react";
import { SunIcon, MoonIcon, BellIcon, SearchIcon } from "./Icons";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export function Navbar({ toggleTheme, isDark }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();

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
            <div className="relative hidden sm:block">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsMenuOpen(false); // Cierra el otro menú si está abierto
                }} 
                className="relative p-2 rounded-full text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FDFBFA] dark:hover:bg-[#26201D] transition-colors"
              >
                <BellIcon />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E06A3B] rounded-full border-2 border-white dark:border-[#1C1715]"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#26201D] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-[#F0E5D8] dark:border-[#3D332D] mb-1 flex justify-between items-center">
                    <span className="font-bold text-[#2D231F] dark:text-[#EFEBE8]">Notificaciones</span>
                    <span className="text-xs text-[#E06A3B] cursor-pointer hover:underline">Marcar leídas</span>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto no-scrollbar">
                    <div className="px-4 py-3 hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 cursor-pointer transition-colors border-b border-[#F0E5D8]/50 dark:border-[#3D332D]/50 border-dashed">
                      <p className="text-sm text-[#2D231F] dark:text-[#EFEBE8]"><span className="font-semibold text-[#E06A3B]">Constructora del Sol</span> vio tu perfil de trabajador.</p>
                      <p className="text-xs text-[#7A6A61] dark:text-[#A39891] mt-1">hace 10 minutos</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 cursor-pointer transition-colors border-b border-[#F0E5D8]/50 dark:border-[#3D332D]/50 border-dashed">
                      <p className="text-sm text-[#2D231F] dark:text-[#EFEBE8]"><span className="font-semibold">Roberto Méndez</span> respondió a tu comentario.</p>
                      <p className="text-xs text-[#7A6A61] dark:text-[#A39891] mt-1">hace 2 horas</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 cursor-pointer transition-colors">
                      <p className="text-sm text-[#2D231F] dark:text-[#EFEBE8]">Hay nuevos trabajos de <span className="font-semibold">Carpintería</span> cerca de ti.</p>
                      <p className="text-xs text-[#7A6A61] dark:text-[#A39891] mt-1">hace 5 horas</p>
                    </div>
                  </div>
                  
                  <div className="px-4 pt-2 mt-1 border-t border-[#F0E5D8] dark:border-[#3D332D] text-center">
                    <button className="text-sm font-semibold text-[#7A6A61] dark:text-[#A39891] hover:text-[#E06A3B] transition-colors">
                      Ver todas
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative ml-2">
              <div 
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setIsNotificationsOpen(false); // Cierra notificaciones si está abierto
                }}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#E06A3B] cursor-pointer transition-transform hover:scale-105"
              >
                <img src={user?.avatar || "https://i.pravatar.cc/150?u=99"} alt="User Profile" className="w-full h-full object-cover" />
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#26201D] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="block px-4 py-3 text-sm border-b border-[#F0E5D8] dark:border-[#3D332D] mb-1">
                    <span className="block font-bold text-[#2D231F] dark:text-[#EFEBE8]">{user?.name || "Usuario"}</span>
                    <span className="block text-xs text-[#7A6A61] dark:text-[#A39891] truncate">{user?.email || ""}</span>
                  </div>
                  <Link href="/profile">
                    <button 
                      onClick={() => { setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 transition-colors"
                    >
                      Perfil
                    </button>
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 transition-colors">
                    Configuraciones
                  </button>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 mt-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-[#F0E5D8] dark:border-[#3D332D]"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
