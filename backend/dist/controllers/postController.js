"use strict";
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
exports.getFeedPosts = void 0;
const Post_1 = require("../models/Post");
const getFeedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterType = req.query.filter || "all";
        let data;
        if (filterType === "all") {
            data = yield Post_1.PostModel.findAll();
        }
        else {
            const typeMap = filterType === "jobs" ? "job" : "worker";
            data = yield Post_1.PostModel.findByType(typeMap);
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error obteniendo los posts en el controlador backend:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getFeedPosts = getFeedPosts;
