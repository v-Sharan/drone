import { Router } from "express";

import { getRequest, createlocation } from "../controllers/requestHandler.js";

const router = Router();

router.get("/", getRequest);
router.post("/", createlocation);

export default router;
