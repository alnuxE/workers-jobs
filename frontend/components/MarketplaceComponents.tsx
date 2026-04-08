import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export interface ProductEntity {
  _id: string;
  seller: { id: string; name: string; avatar: string; };
  title: string;
  description: string;
  price: string;
  condition: "Nuevo" | "Usado";
  location: string;
  imagePath: string;
  tags: string[];
}

export function ProductCard({ product }: { product: ProductEntity }) {
  return (
    <div className="bg-white dark:bg-[#26201D] rounded-2xl overflow-hidden border border-[#F0E5D8] dark:border-[#3D332D] shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative h-48 w-full overflow-hidden bg-[#FCF8F4] dark:bg-[#1A1614]">
        <img src={product.imagePath} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#1A1614]/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-[#2D231F] dark:text-[#EFEBE8] uppercase tracking-wider">
          {product.condition}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate text-[#2D231F] dark:text-[#EFEBE8]">{product.title}</h3>
        <p className="font-extrabold text-xl text-[#E06A3B] mb-3">${product.price}</p>
        
        <div className="flex items-center gap-3 mb-4 bg-[#FCF8F4] dark:bg-[#1A1614] rounded-xl p-2.5">
          <img src={product.seller.avatar} alt="Vendedor" className="w-8 h-8 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#7A6A61] dark:text-[#A39891] truncate">Vendido por</p>
            <p className="text-sm font-bold truncate text-[#2D231F] dark:text-[#EFEBE8]">{product.seller.name}</p>
          </div>
        </div>

        <button className="w-full flex justify-center items-center gap-2 bg-[#FCF8F4] hover:bg-[#F0E5D8] dark:bg-[#3D332D] dark:hover:bg-[#52443C] text-[#2D231F] dark:text-[#EFEBE8] py-2.5 rounded-xl text-sm font-bold border border-[#F0E5D8] dark:border-[#52443C] transition-colors active:scale-[0.98]">
          Contactar Vendedor
        </button>
      </div>
    </div>
  );
}

export function CreateProductModal({ isOpen, onClose, onCreated }: { isOpen: boolean, onClose: () => void, onCreated: () => void }) {
  const { token, user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Nuevo");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !title || !price || !location) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("location", location);
      if (file) {
        formData.append("image", file);
      }

      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        onCreated();
        onClose();
        setTitle(""); setDescription(""); setPrice(""); setLocation(""); setFile(null); setPreview(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#26201D] w-full max-w-lg rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center p-5 border-b border-[#F0E5D8] dark:border-[#3D332D]">
          <h2 className="text-xl font-bold text-[#2D231F] dark:text-[#EFEBE8]">Publicar un Producto</h2>
          <button onClick={onClose} className="text-[#A39891] hover:text-[#2D231F] dark:hover:text-[#EFEBE8] transition-colors rounded-full p-1 bg-[#FCF8F4] dark:bg-[#1A1614]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 no-scrollbar">
          
          <div className="flex items-center gap-4 pb-2">
            <img src={user?.avatar || "https://i.pravatar.cc/150?u=99"} className="w-10 h-10 rounded-full" alt="avatar" />
            <div>
              <p className="text-sm font-bold text-[#2D231F] dark:text-[#EFEBE8]">{user?.name || "Vendedor"}</p>
              <p className="text-xs text-[#7A6A61] dark:text-[#A39891]">Publicando en el Tianguis</p>
            </div>
          </div>

          <div className="w-full relative bg-[#FCF8F4] dark:bg-[#1A1614] border-2 border-dashed border-[#F0E5D8] dark:border-[#52443C] rounded-xl flex items-center justify-center overflow-hidden hover:border-[#E06A3B] transition-colors h-48 cursor-pointer group">
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <span className="block text-[#E06A3B] mb-2 text-2xl">📸</span>
                <span className="text-sm font-medium text-[#7A6A61] dark:text-[#A39891] group-hover:text-[#E06A3B] transition-colors">Añadir Foto del Producto</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>

          <div className="space-y-3">
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título del Artículo *" className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 text-sm focus:border-[#E06A3B] outline-none" />
            <input required type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="Precio (ej. 1500) *" className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 text-sm focus:border-[#E06A3B] outline-none" />
            
            <div className="flex gap-2">
              <button type="button" onClick={() => setCondition("Nuevo")} className={`flex-1 py-2 text-sm font-bold rounded-xl transition-colors ${condition === "Nuevo" ? 'bg-[#E06A3B] text-white' : 'bg-[#FCF8F4] dark:bg-[#3D332D] text-[#7A6A61] dark:text-[#A39891]'}`}>Nuevo</button>
              <button type="button" onClick={() => setCondition("Usado")} className={`flex-1 py-2 text-sm font-bold rounded-xl transition-colors ${condition === "Usado" ? 'bg-[#E06A3B] text-white' : 'bg-[#FCF8F4] dark:bg-[#3D332D] text-[#7A6A61] dark:text-[#A39891]'}`}>Usado</button>
            </div>

            <input required type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="¿Dónde se entrega? *" className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 text-sm focus:border-[#E06A3B] outline-none" />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Detallales de la herramienta o producto..." className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 text-sm focus:border-[#E06A3B] outline-none resize-none h-20" />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="w-full bg-[#E06A3B] text-white py-3 rounded-xl font-bold shadow-md shadow-[#E06A3B]/30 disabled:opacity-50 hover:bg-[#C65B30] transition-colors">
              {loading ? "Publicando..." : "Vender Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
