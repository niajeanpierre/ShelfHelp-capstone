import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import bookRouter from "./books"
import readRouter from './read'

const router = Router();

router.route("/").get(healthCheck);

router.use('/book', bookRouter)
router.use('/read', readRouter)

export default router;
