"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar, RightBar } from "@/components/Sidebars";
import { CreatePost, FeedTabs, PostCard } from "@/components/PostComponents";
import { PostEntity } from "@/components/PostComponents";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 1. Efecto para manejar el Tema Oscuro/Claro (Modo UI)
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

  // 2. Interacción con el Backend (API)
  const fetchPosts = async () => {
    if (!token) return;
    try {
      const response = await fetch(`http://localhost:4000/api/posts?filter=${activeTab}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (err) {
      console.error("Error al conectarse con Backend Express:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // 3. Renderizado de la Vista (View Layer)
  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-[#1A1614] dark:text-[#EFEBE8]">Cargando plataforma...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Barra Lateral Izquierda */}
        <div className="hidden md:block md:col-span-3">
          <Sidebar />
        </div>

        {/* Sección Central (Feed Principal) */}
        <section className="md:col-span-9 lg:col-span-6 space-y-6">
          <CreatePost onPostCreated={fetchPosts} />
          
          <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Listado de Posts dinámicos del Modelo */}
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-center text-[#7A6A61] dark:text-[#A39891] pt-10">Cargando publicaciones...</p>
            )}
          </div>
        </section>

        {/* Barra Lateral Derecha */}
        <div className="hidden lg:block lg:col-span-3">
          <RightBar />
        </div>
      </main>
    </div>
  );
}
