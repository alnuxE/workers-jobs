"use strict";
// Este archivo representa el Modelo de Base de Datos.
// Por ahora servimos un Mock para asegurar que la conexión Frontend-Backend funcione.
// Agregaremos Mongoose cuando estés listo para conectar MongoDB.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mockDatabase = [
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
exports.PostModel = {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Cuando Mongoose se integra: return await Post.find();
            return mockDatabase;
        });
    },
    findByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return mockDatabase.filter(p => p.type === type);
        });
    }
};
