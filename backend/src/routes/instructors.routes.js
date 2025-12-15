import { Router } from "express";
import instructorsController from "../controllers/instructorsController.js";

const router = Router();

router.get("/", instructorsController.list);
router.get("/:id", instructorsController.get);
router.post("/", instructorsController.create);
router.put("/:id", instructorsController.update);
router.delete("/:id", instructorsController.remove);

export default router;
