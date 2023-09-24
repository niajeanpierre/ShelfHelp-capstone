import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import bookRouter from "./books"
import authRouter from "./auth"

const router = Router();

router.route("/").get(healthCheck);

router.use('/book', bookRouter)
router.use('/auth', authRouter)

export default router;
