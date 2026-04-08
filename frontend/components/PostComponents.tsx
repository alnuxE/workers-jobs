import React, { useState } from "react";
import { HeartIcon, MessageIcon, MapPinIcon, BriefcaseIcon, WorkerIcon } from "./Icons";
import { useAuth } from "@/context/AuthContext";

export interface Author {
  name: string;
  avatar: string;
  role: string;
  time: string;
}

export interface PostEntity {
  _id: string;
  type: "job" | "worker"; 
  author: Author;
  title: string;
  description: string;
  tags: string[];
  location: string;
  budget?: string;
  rate?: string;
  likedBy: string[];
  comments: any[];
}


export function CreatePost({ onPostCreated }: { onPostCreated?: () => void }) {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [type, setType] = useState<"job"|"worker">("job");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !location) return;
    
    setIsSubmitting(true);
    try {
      const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
      
      const payload = {
        type,
        title,
        description,
        location,
        budget: type === "job" ? budget : undefined,
        rate: type === "worker" ? budget : undefined,
        tags,
        author: {
          name: user?.name || "Usuario Activo",
          avatar: user?.avatar || "https://i.pravatar.cc/150?u=99",
          role: user?.role || (type === "job" ? "Empresario" : "Independiente"),
          time: "hace un momento"
        }
      };

      const res = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        setLocation("");
        setBudget("");
        setTagsInput("");
        setIsExpanded(false);
        if (onPostCreated) onPostCreated();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm transition-all duration-300">
      <div className="flex gap-4 mb-4">
        <img src={user?.avatar || "https://i.pravatar.cc/150?u=99"} alt="User" className="w-10 h-10 rounded-full object-cover" />
        <textarea 
          rows={isExpanded ? 3 : 2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onClick={() => setIsExpanded(true)}
          className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 text-sm placeholder-[#A39891] text-[#2D231F] dark:text-[#EFEBE8] outline-none focus:border-[#E06A3B] border-opacity-50 focus:border-opacity-100 resize-none transition-all"
          placeholder="¿Qué estás buscando? (Ej. Busco plomero, ofrezco trabajo...)"
        ></textarea>
      </div>

      {isExpanded && (
        <div className="sm:pl-14 space-y-3 mb-4 animate-in fade-in duration-300">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título breve (ej. Necesito Plomero) *"
            className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-lg p-2.5 text-sm outline-none focus:border-[#E06A3B]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ubicación *"
              className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-lg p-2.5 text-sm outline-none focus:border-[#E06A3B]"
            />
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder={type === "job" ? "Presupuesto (ej. $1000)" : "Tarifa (ej. $50/hr)"}
              className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-lg p-2.5 text-sm outline-none focus:border-[#E06A3B]"
            />
          </div>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Etiquetas separadas por coma (ej. plomería, urgente)"
            className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-lg p-2.5 text-sm outline-none focus:border-[#E06A3B]"
          />
        </div>
      )}

      <div className="flex justify-between items-center sm:pl-14">
        <div className="flex gap-2">
          <button 
            onClick={() => { setIsExpanded(true); setType("job"); }}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${type === "job" ? 'bg-[#FCF8F4] dark:bg-[#3D332D]/80 text-[#2D231F] dark:text-white' : 'text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40'}`}
          >
            <span className="text-[#E06A3B]"><BriefcaseIcon /></span> Propuesta
          </button>
          <button 
            onClick={() => { setIsExpanded(true); setType("worker"); }}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${type === "worker" ? 'bg-[#FCF8F4] dark:bg-[#3D332D]/80 text-[#2D231F] dark:text-white' : 'text-[#7A6A61] dark:text-[#A39891] hover:bg-[#FCF8F4] dark:hover:bg-[#3D332D]/40'}`}
          >
            <span className="text-amber-500"><WorkerIcon /></span> Promocionarme
          </button>
        </div>
        <div className="flex gap-2">
          {isExpanded && (
            <button 
              onClick={() => setIsExpanded(false)}
              className="px-4 text-xs font-semibold text-[#7A6A61] dark:text-[#A39891] hover:text-[#2D231F] dark:hover:text-[#EFEBE8] transition-colors"
            >
              Cancelar
            </button>
          )}
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || !title || !description || !location}
            className="bg-[#E06A3B] hover:bg-[#C65B30] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-[#E06A3B]/20 transition-all active:scale-95"
          >
            {isSubmitting ? "Publicando..." : "Publicar"}
          </button>
        </div>
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
  const { user, token } = useAuth();
  const [localPost, setLocalPost] = useState<PostEntity>(post);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const likedArray = Array.isArray(localPost.likedBy) ? localPost.likedBy : [];
  const commentsArray = Array.isArray(localPost.comments) ? localPost.comments : [];

  const isJob = localPost.type === "job";
  const badgeColor = isJob ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" : "bg-[#FDF5F2] text-[#E06A3B] dark:bg-[#E06A3B]/20 dark:text-[#F27A4A]";
  
  const hasLiked = user ? likedArray.includes(user.id) : false;

  const handleLike = async () => {
    if (!token) return;
    try {
      // Optimistic Update
      const previousLikedBy = [...likedArray];
      if (hasLiked) {
        setLocalPost({ ...localPost, likedBy: likedArray.filter(id => id !== user?.id) });
      } else {
        setLocalPost({ ...localPost, likedBy: [...likedArray, user!.id] });
      }

      const res = await fetch(`http://localhost:4000/api/posts/${localPost._id}/like`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedPost = await res.json();
        setLocalPost(updatedPost);
      } else {
        // Revert on error
        setLocalPost({ ...localPost, likedBy: previousLikedBy });
      }
    } catch (e) {}
  };

  const handleCommentSubmit = async () => {
    if (!token || !newComment.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/api/posts/${localPost._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ text: newComment })
      });
      if (res.ok) {
        const updatedPost = await res.json();
        setLocalPost(updatedPost);
        setNewComment("");
      }
    } catch (e) {}
  };

  return (
    <div className="bg-white dark:bg-[#26201D] rounded-2xl p-5 border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <img src={localPost.author.avatar} alt={localPost.author.name} className="w-11 h-11 rounded-full object-cover border border-[#F0E5D8] dark:border-[#3D332D]" />
          <div>
            <h4 className="font-bold text-[15px] leading-tight">{localPost.author.name}</h4>
            <div className="flex items-center gap-2 text-xs text-[#7A6A61] dark:text-[#A39891]">
              <span className="font-medium text-[#2D231F] dark:text-[#EFEBE8] opacity-80">{localPost.author.role}</span>
              <span>•</span>
              <span>{localPost.author.time}</span>
            </div>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeColor}`}>
          {isJob ? "Se Busca" : "Ofrezco Servicio"}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">{localPost.title}</h3>
        <p className="text-sm text-[#52443C] dark:text-[#B8AEA7] leading-relaxed mb-4">
          {localPost.description}
        </p>
        
        {/* Meta Info */}
        <div className="bg-[#FCF8F4] dark:bg-[#1A1614] rounded-xl p-3 border border-[#F0E5D8] dark:border-[#3D332D] flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div className="flex items-start gap-2 text-sm">
            <span className="text-[#E06A3B] mt-0.5"><MapPinIcon /></span>
            <div>
              <span className="block text-xs text-[#7A6A61] dark:text-[#A39891] font-semibold uppercase">Ubicación</span>
              <span className="font-medium text-[#2D231F] dark:text-[#EFEBE8]">{localPost.location}</span>
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
              <span className="font-medium text-[#2D231F] dark:text-[#EFEBE8]">{localPost.budget || localPost.rate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {localPost.tags.map((tag: string) => (
          <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-[#F0E5D8]/50 dark:bg-[#3D332D]/50 text-[#52443C] dark:text-[#B8AEA7] rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Action footer */}
      <div className="flex gap-4 pt-4 border-t border-[#F0E5D8] dark:border-[#3D332D]">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors text-sm font-medium ${hasLiked ? 'text-red-500 hover:text-red-600' : 'text-[#7A6A61] dark:text-[#A39891] hover:text-[#E06A3B] dark:hover:text-[#F27A4A]'}`}
        >
          <HeartIcon filled={hasLiked} /> {likedArray.length}
        </button>
        <button 
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className={`flex items-center gap-1.5 transition-colors text-sm font-medium ${isCommentsOpen ? 'text-[#E06A3B] dark:text-[#F27A4A]' : 'text-[#7A6A61] dark:text-[#A39891] hover:text-[#E06A3B] dark:hover:text-[#F27A4A]'}`}
        >
          <MessageIcon /> {commentsArray.length} Comentarios
        </button>
        
        <button className="ml-auto bg-[#FCF8F4] hover:bg-[#F0E5D8] dark:bg-[#3D332D] dark:hover:bg-[#52443C] text-[#2D231F] dark:text-[#EFEBE8] px-4 py-1.5 rounded-lg text-sm font-bold border border-[#F0E5D8] dark:border-[#52443C] transition-colors">
          Contactar
        </button>
      </div>
      {/* Comments Panel */}
      {isCommentsOpen && (
        <div className="mt-4 pt-4 border-t border-[#F0E5D8] dark:border-[#3D332D] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-4 mb-4 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {commentsArray.length === 0 ? (
              <p className="text-sm text-center text-[#7A6A61] dark:text-[#A39891] py-2">Sé el primero en comentar.</p>
            ) : (
              commentsArray.map((c: any, i: number) => (
                <div key={i} className="flex gap-3">
                  <img src={c.authorAvatar} alt={c.authorName} className="w-8 h-8 rounded-full border border-[#F0E5D8] dark:border-[#3D332D]" />
                  <div className="bg-[#FCF8F4] dark:bg-[#1A1614] rounded-xl rounded-tl-none p-3 border border-[#F0E5D8] dark:border-[#3D332D] flex-1">
                    <h5 className="font-bold text-xs text-[#2D231F] dark:text-[#EFEBE8]">{c.authorName}</h5>
                    <p className="text-sm text-[#52443C] dark:text-[#B8AEA7] mt-1">{c.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="flex-1 bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-2.5 text-sm outline-none focus:border-[#E06A3B] transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
            />
            <button 
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
              className="bg-[#E06A3B] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm disabled:opacity-50 transition-all hover:bg-[#C65B30]"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
