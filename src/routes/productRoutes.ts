import { Router } from "express";
import {
  addProduct,
  changeFav,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get("/", getAllProducts);
router.post("/", upload.array("images"), addProduct);
router.put("/:id", upload.array("images"), updateProduct);
router.put("/:id/fav", changeFav);
router.delete("/:id", deleteProduct);

export default router;
