import express from "express";
import History from "../models/history_model";
import { Request, Response } from "express";


const router = express.Router();

// Obtener todo el historial
router.get("/", async (req: Request, res: Response) => {
    try {
        const { userId } = req.query; 
        const query = userId ? { userId } : {};
        const history = await History.find(query, 'userId subjectName methodName totalStudyTime date')
            .populate("userId", "name email");
        res.status(200).json(history);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error Interno del Servidor' });
        }
    }
});



// Obtener historial del usuario
router.get("/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const query = { userId };
        const history = await History.find(query, 'userId subjectName methodName totalStudyTime date')
            .populate("userId", "name email");
        res.status(200).json(history);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error Interno del Servidor' });
        }
    }
});

router.post("/", async (req: Request, res: Response ) => {
  try {
    const { userId, methodName, subjectName, totalStudyTime } =
      req.body;

    const newSession = new History({
      userId,
      methodName,
      subjectName,
      totalStudyTime
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
    console.log(savedSession)
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la sesión", error: error instanceof Error ? error.message : 'Error desconocido' });
  }
});

// Eliminar todo el historial
router.delete("/", async (req: Request, res: Response) => {
    try {
        await History.deleteMany({});
        res.status(200).json({ message: 'Todo el historial ha sido eliminado correctamente' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error Interno del Servidor' });
        }
    }
});



export default router;
