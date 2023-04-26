import { Router } from "express";

import {
  getRequest,
  createlocation,
  deleteLocation,
  updateLocation,
} from "../controllers/requestHandler.js";

const router = Router();

router.get("/", getRequest);
router.post("/", createlocation);
router.delete("/:id", deleteLocation);
router.patch("/:id", updateLocation);

export default router;
