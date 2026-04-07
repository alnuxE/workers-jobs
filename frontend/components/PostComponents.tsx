import React from "react";
import { HeartIcon, MessageIcon, MapPinIcon, BriefcaseIcon, WorkerIcon } from "./Icons";

export interface Author {
  name: string;
  avatar: string;
  role: string;
  time: string;
}

export interface PostEntity {
  id: number;
  type: "job" | "worker"; 
  author: Author;
  title: string;
  description: string;
  tags: string[];
  location: string;
  budget?: string;
  rate?: string;
  likes: number;
  comments: number;
}


export function CreatePost() {
  return (
    <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm">
      <div className="flex gap-4 mb-4">
        <img src="https://i.pravatar.cc/150?u=99" alt="User" className="w-10 h-10 rounded-full" />
        <textarea 
          rows={2} 
          className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 text-sm placeholder-[#A39891] text-[#2D231F] dark:text-[#EFEBE8] outline-none focus:border-[#E06A3B] focus:ring-1 focus:ring-[#E06A3B]/50 resize-none transition-all"
          placeholder="¿Qué estás buscando? (Ej. Busco plomero, ofrezco trabajo en carpintería...)"
        ></textarea>
      </div>
      <div className="flex justify-between items-center sm:pl-14">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 transition-colors">
            <span className="text-[#E06A3B]"><BriefcaseIcon /></span> Propuesta
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40 transition-colors">
            <span className="text-amber-500"><WorkerIcon /></span> Promocionarme
          </button>
        </div>
        <button className="bg-[#E06A3B] hover:bg-[#C65B30] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-[#E06A3B]/20 transition-all active:scale-95">
          Publicar
        </button>
      </div>
    </div>
  );
}

export function FeedTabs({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (v: string) => void }) {
  const tabs = [
    { id: 'all', label: 'Todos' },
    { id: 'jobs', label: 'Trabajos Urgentes' },
    { id: 'workers', label: 'Trabajadores' },
  ];

  return (
    <div className="flex gap-4 border-b border-[#F0E5D8] dark:border-[#3D332D] pb-1 overflow-x-auto no-scrollbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-2 text-sm font-semibold whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-[#E06A3B]' : 'text-[#7A6A61] dark:text-[#A39891] hover:text-[#2D231F] dark:hover:text-[#EFEBE8]'}`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#E06A3B] rounded-t-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}

export function PostCard({ post }: { post: PostEntity }) {
  const isJob = post.type === "job";
  const badgeColor = isJob ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" : "bg-[#FDF5F2] text-[#E06A3B] dark:bg-[#E06A3B]/20 dark:text-[#F27A4A]";
  
  return (
    <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover border border-[#F0E5D8] dark:border-[#3D332D]" />
          <div>
            <h4 className="font-bold text-[15px] leading-tight">{post.author.name}</h4>
            <div className="flex items-center gap-2 text-xs text-[#7A6A61] dark:text-[#A39891]">
              <span className="font-medium text-[#2D231F] dark:text-[#EFEBE8] opacity-80">{post.author.role}</span>
              <span>•</span>
              <span>{post.author.time}</span>
            </div>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeColor}`}>
          {isJob ? "Se Busca" : "Ofrezco Servicio"}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-sm text-[#52443C] dark:text-[#B8AEA7] leading-relaxed mb-4">
          {post.description}
        </p>
        
        {/* Meta Info */}
        <div className="bg-[#FCF8F4] dark:bg-[#1A1614] rounded-xl p-3 border border-[#F0E5D8] dark:border-[#3D332D] flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div className="flex items-start gap-2 text-sm">
            <span className="text-[#E06A3B] mt-0.5"><MapPinIcon /></span>
            <div>
              <span className="block text-xs text-[#7A6A61] dark:text-[#A39891] font-semibold uppercase">Ubicación</span>
              <span className="font-medium text-[#2D231F] dark:text-[#EFEBE8]">{post.location}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-[#E06A3B] mt-0.5">
              {isJob ? <BriefcaseIcon /> : <WorkerIcon />}
            </span>
            <div>
              <span className="block text-xs text-[#7A6A61] dark:text-[#A39891] font-semibold uppercase">
                {isJob ? "Presupuesto" : "Tarifa"}
              </span>
              <span className="font-medium text-[#2D231F] dark:text-[#EFEBE8]">{post.budget || post.rate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: string) => (
          <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-[#F0E5D8]/50 dark:bg-[#3D332D]/50 text-[#52443C] dark:text-[#B8AEA7] rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Action footer */}
      <div className="flex gap-4 pt-4 border-t border-[#F0E5D8] dark:border-[#3D332D]">
        <button className="flex items-center gap-1.5 text-[#7A6A61] dark:text-[#A39891] hover:text-[#E06A3B] dark:hover:text-[#F27A4A] transition-colors text-sm font-medium">
          <HeartIcon /> {post.likes}
        </button>
        <button className="flex items-center gap-1.5 text-[#7A6A61] dark:text-[#A39891] hover:text-[#E06A3B] dark:hover:text-[#F27A4A] transition-colors text-sm font-medium">
          <MessageIcon /> {post.comments} Comentarios
        </button>
        
        <button className="ml-auto bg-[#FCF8F4] hover:bg-[#F0E5D8] dark:bg-[#3D332D] dark:hover:bg-[#52443C] text-[#2D231F] dark:text-[#EFEBE8] px-4 py-1.5 rounded-lg text-sm font-bold border border-[#F0E5D8] dark:border-[#52443C] transition-colors">
          Contactar
        </button>
      </div>
    </div>
  );
}
