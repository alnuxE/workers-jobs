import React from "react";

export function Sidebar() {
  return (
    <aside className="sticky top-24 space-y-6">
      {/* Mini Profile */}
      <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <img src="https://i.pravatar.cc/150?u=99" alt="User" className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-bold text-[15px]">Carlos Electricista</h3>
            <p className="text-xs text-[#7A6A61] dark:text-[#A39891]">@carlos_elec</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center pb-4 border-b border-[#F0E5D8] dark:border-[#3D332D] mb-4">
          <div>
            <p className="text-sm font-semibold">14</p>
            <p className="text-[11px] text-[#A39891] uppercase tracking-wide">Trabajos</p>
          </div>
          <div>
            <p className="text-sm font-semibold">4.9 ★</p>
            <p className="text-[11px] text-[#A39891] uppercase tracking-wide">Rating</p>
          </div>
        </div>
        <div className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-[#E06A3B] bg-[#E06A3B]/10 dark:bg-[#E06A3B]/20 transition-colors">
            Inicio
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 transition-colors">
            Mis Aplicaciones
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 transition-colors">
            Mensajes
          </a>
        </div>
      </div>

      {/* Suggested Skills */}
      <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm">
        <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-[#A39891]">Tendencias en Oficios</h4>
        <div className="flex flex-wrap gap-2">
          {["Carpintería", "Plomería", "Albañilería", "Mecánica", "Electricidad", "Herrería"].map(skill => (
            <span key={skill} className="text-xs font-medium px-3 py-1 bg-[#FCF8F4] dark:bg-[#3D332D] text-[#7A6A61] dark:text-[#EFEBE8] rounded-full border border-[#F0E5D8] dark:border-[#52443C] cursor-pointer hover:border-[#E06A3B] transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function RightBar() {
  return (
    <aside className="sticky top-24 space-y-6">
      <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm">
        <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-[#A39891]">Destacados Cerca de Ti</h4>
        <div className="space-y-4">
          {[
            { name: "Juan Albañil", role: "Albañilería y Acabados", rating: "4.9", src: "https://i.pravatar.cc/150?u=12" },
            { name: "Mecánica Express", role: "Taller Automotriz", rating: "4.8", src: "https://i.pravatar.cc/150?u=44" },
            { name: "Don Marcos", role: "Ferretero / Herrero", rating: "5.0", src: "https://i.pravatar.cc/150?u=22" }
          ].map((worker, i) => (
            <div key={i} className="flex items-center gap-3">
              <img src={worker.src} alt="Worker" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 overflow-hidden">
                <h5 className="font-bold text-sm truncate">{worker.name}</h5>
                <p className="text-[11px] text-[#A39891] truncate">{worker.role}</p>
              </div>
              <div className="text-sm font-bold text-[#E06A3B] bg-[#E06A3B]/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
                ★ {worker.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
