import { Router } from "express";

import {
  getRequest,
  createlocation,
  deleteLocation,
} from "../controllers/requestHandler.js";

const router = Router();

router.get("/", getRequest);
router.post("/", createlocation);
router.delete("/:id", deleteLocation);
router.patch("/:id");

export default router;
