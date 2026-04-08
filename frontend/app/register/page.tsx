"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Usuario");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en el registro");
      
      login(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#26201D] p-8 rounded-2xl shadow-xl border border-[#F0E5D8] dark:border-[#3D332D]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Únete a OficioRed</h1>
          <p className="text-[#7A6A61] dark:text-[#A39891]">Crea tu cuenta para comenzar</p>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Cuenta</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#FCF8F4] dark:bg-[#1A1614] border border-[#F0E5D8] dark:border-[#3D332D] rounded-xl p-3 outline-none focus:border-[#E06A3B] transition-colors"
            >
              <option value="Usuario">Busco Trabajadores</option>
              <option value="Independiente">Soy Trabajador / Ofrezco Servicios</option>
              <option value="Empresa">Soy una Empresa</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#E06A3B] hover:bg-[#C65B30] text-white py-3 rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Cargando..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#7A6A61] dark:text-[#A39891]">
          ¿Ya tienes una cuenta? <Link href="/login" className="text-[#E06A3B] font-semibold hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
