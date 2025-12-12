import { Router } from "express";
import controller from "../controllers/coursesController.js";

const router = Router();
router.get("/", controller.list);
router.get("/:id", controller.get);
export default router;
