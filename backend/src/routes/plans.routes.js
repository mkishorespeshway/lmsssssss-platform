import { Router } from "express";
import controller from "../controllers/plansController.js";

const router = Router();
router.get("/", controller.list);
export default router;
