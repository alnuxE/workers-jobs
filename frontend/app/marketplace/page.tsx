"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebars";
import { ProductCard, CreateProductModal, ProductEntity } from "@/components/MarketplaceComponents";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MarketplacePage() {
  const [isDark, setIsDark] = useState(false);
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (window.matchMedia && document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const fetchProducts = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-[#1A1614] dark:text-[#EFEBE8]">Cargando Tienda...</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-3">
          <Sidebar />
        </div>

        {/* Marketplace Center */}
        <section className="md:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-[#26201D] p-5 rounded-2xl border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2D231F] dark:text-[#EFEBE8]">Marketplace <span className="text-[#E06A3B]">Oficios</span></h1>
              <p className="text-sm text-[#7A6A61] dark:text-[#A39891] mt-1">Compra y vende herramientas o materiales con tu comunidad.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#E06A3B] hover:bg-[#C65B30] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-colors active:scale-95 whitespace-nowrap"
            >
              + Publicar Artículo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map(p => <ProductCard key={p._id} product={p} />)
            ) : (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-[#F0E5D8] dark:border-[#3D332D] rounded-2xl">
                <p className="text-[#A39891] font-medium">Aún no hay productos a la venta en el marketplace.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <CreateProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreated={fetchProducts} 
      />
    </div>
  );
}
