// Este archivo representa el Modelo de Base de Datos.
// Por ahora servimos un Mock para asegurar que la conexión Frontend-Backend funcione.
// Agregaremos Mongoose cuando estés listo para conectar MongoDB.

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

const mockDatabase: PostEntity[] = [
  {
    id: 1,
    type: "job",
    author: {
      name: "Constructora del Sol",
      avatar: "https://i.pravatar.cc/150?u=1",
      role: "Empresa",
      time: "hace 2 horas"
    },
    title: "Se necesita Carpintero para acabados en madera",
    description: "Buscamos un carpintero con experiencia comprobable en instalación de puertas, closets y zócalos para obra residencial en la zona centro. El trabajo dura aproximadamente 2 semanas. Herramientas básicas sugeridas, pero damos maquinaria pesada.",
    tags: ["Carpintería", "Temporal", "Urgente"],
    location: "Centro, Ciudad Principal",
    budget: "$800 - $1200 / trabajo",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    type: "worker",
    author: {
      name: "Roberto Méndez",
      avatar: "https://i.pravatar.cc/150?u=2",
      role: "Mecánico Automotriz",
      time: "hace 5 horas"
    },
    title: "Mecánico a domicilio - Especialista en diésel",
    description: "Tengo más de 15 años de experiencia reparando motores diésel y gasolina de todo tipo. Ofrezco servicio de escáner a domicilio, afinación, frenos y revisiones generales para flotas o particulares. Trabajo garantizado y presupuestos sin compromiso.",
    tags: ["Mecánica", "A Domicilio", "Diagnóstico"],
    location: "Zona Norte y alrededores",
    rate: "Desde $50 / diagnóstico",
    likes: 34,
    comments: 8,
  }
];

export const PostModel = {
  async findAll(): Promise<PostEntity[]> {
    // Cuando Mongoose se integra: return await Post.find();
    return mockDatabase;
  },

  async findByType(type: "job" | "worker"): Promise<PostEntity[]> {
    return mockDatabase.filter(p => p.type === type);
  }
};
