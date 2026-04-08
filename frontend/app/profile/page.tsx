"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, token, loading, updateUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const [isDark, setIsDark] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setName(user.name || "");
      setBio((user as any).bio || "");
      setLocation((user as any).location || "");
      setPhone((user as any).phone || "");
      setSkills((user as any).skills?.join(", ") || "");
      setAvatarPreview(user.avatar || "");
    }
  }, [user, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("location", location);
    formData.append("phone", phone);
    formData.append("skills", skills);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await fetch("http://localhost:4000/api/users/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar perfil");

      updateUser(data);
      setSuccessMsg("Perfil actualizado exitosamente");
      window.scrollTo(0, 0);

      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-[#1A1614] dark:text-[#EFEBE8]">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFBFA] dark:bg-[#1A1614] transition-colors">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-[100px] pb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-[#2D231F] dark:text-[#EFEBE8]">Configura tu Perfil</h1>

        {successMsg && <div className="mb-6 p-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-xl font-medium">{successMsg}</div>}
        {errorMsg && <div className="mb-6 p-4 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-xl font-medium">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#26201D] p-6 sm:p-8 rounded-3xl shadow-sm border border-[#F0E5D8] dark:border-[#3D332D]">
          
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-[#F0E5D8] dark:border-[#3D332D]">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#F0E5D8] dark:border-[#3D332D] shadow-md group-hover:border-[#E06A3B] transition-colors">
                <img src={avatarPreview || "https://i.pravatar.cc/150?u=99"} alt="Avatar Preview" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Cambiar</span>
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#2D231F] dark:text-[#EFEBE8]">Foto de Perfil</h3>
              <p className="text-sm text-[#7A6A61] dark:text-[#A39891] max-w-sm mt-1">Sube una fotografía profesional y nítida. Formatos JPG o PNG.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#2D231F] dark:text-[#EFEBE8]">Nombre de Usuario / Empresa</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#2D231F] dark:text-[#EFEBE8]">Teléfono de Contacto</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. +52 555 123 4567"
                  className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[#2D231F] dark:text-[#EFEBE8]">Acerca de Ti (Bio/Título)</label>
              <textarea 
                rows={3} 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Ej. Plomero experto con 10 años en reparación de tuberías industriales..."
                className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#2D231F] dark:text-[#EFEBE8]">Ubicación (Ciudad/Zona)</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Zona Metropolitana"
                  className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#2D231F] dark:text-[#EFEBE8]">Habilidades (Separadas por coma)</label>
                <input 
                  type="text" 
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Ej. Plomería, Electricidad, Soldadura"
                  className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#F0E5D8] dark:border-[#3D332D] flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#E06A3B] hover:bg-[#C65B30] text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-[#E06A3B]/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Guardando cambios..." : "Guardar Perfil"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
