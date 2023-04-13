import express from "express";
import productController from '../controllers/ProductController.js'
import bodyParser from 'body-parser';
import multer from 'multer';
import path from "path";

const Storage = multer.diskStorage({
    destination: "../src/assets/image",
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: Storage});


const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json()); 

categoryRouter.get('/', productController.list);

categoryRouter.get('/listDiscount', productController.listDiscount);

categoryRouter.get('/:productId', productController.find);

categoryRouter.put('/:productId', productController.edit);

categoryRouter.delete('/:productId', productController.delete);

categoryRouter.post('/', upload.single('imageField'), productController.create);

export default categoryRouter;
