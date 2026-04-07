"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar, RightBar } from "@/components/Sidebars";
import { CreatePost, FeedTabs, PostCard } from "@/components/PostComponents";
// Importar modelo sólo para los tipos en frontend, aunque en MVC estrictamente se comparte interfaz o se duplica.
import { PostEntity } from "@/components/PostComponents"; // o donde estén definidos si mudamos todo.

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState<PostEntity[]>([]);

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

  // 2. Efecto para interactuar con el Controlador (Backend API Extremo)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts?filter=${activeTab}`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error al conectarse con Backend Express:", err);
      }
    };

    fetchPosts();
  }, [activeTab]);

  // 3. Renderizado de la Vista (View Layer)
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
          <CreatePost />
          
          <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Listado de Posts dinámicos del Modelo */}
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => <PostCard key={post.id} post={post} />)
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
