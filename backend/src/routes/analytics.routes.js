import { Router } from "express";
import controller from "../controllers/analyticsController.js";

const router = Router();
router.get("/overview", controller.overview);
export default router;
