import express from "express";
import productController from '../controllers/ProductController.js'
import bodyParser from 'body-parser';

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json({ limit: '50mb' })); 

categoryRouter.get('/', productController.list);

categoryRouter.get('/:productId', productController.find)

categoryRouter.put('/:productId', productController.edit )

categoryRouter.delete('/:productId', productController.delete)

categoryRouter.post('/', productController.create)



export default categoryRouter;