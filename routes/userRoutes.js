import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticateUser);
// Authenticate if user is logged in.
router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplicationStats);
router.patch("/update-user", updateUser);

export default router;
