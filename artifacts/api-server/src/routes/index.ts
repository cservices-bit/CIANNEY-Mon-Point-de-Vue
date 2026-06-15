import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import statsRouter from "./stats";
import articlesRouter from "./articles";
import eventsRouter from "./events";
import videosRouter from "./videos";
import photosRouter from "./photos";
import testimonialsRouter from "./testimonials";
import partnersRouter from "./partners";
import productsRouter from "./products";
import commentsRouter from "./comments";
import newsletterRouter from "./newsletter";
import contactRouter from "./contact";
import achievementsRouter from "./achievements";
import guestbookRouter from "./guestbook";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(statsRouter);
router.use(articlesRouter);
router.use(eventsRouter);
router.use(videosRouter);
router.use(photosRouter);
router.use(testimonialsRouter);
router.use(partnersRouter);
router.use(productsRouter);
router.use(commentsRouter);
router.use(newsletterRouter);
router.use(contactRouter);
router.use(achievementsRouter);
router.use(guestbookRouter);
router.use(usersRouter);

export default router;
