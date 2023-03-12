import ProductModel from '../models/ProductModel.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import createProductSchema from '../validator/products/create.js';
import { json } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const UPLOADS_DIR = path.join(path.dirname(__filename), '..', 'uploads');
const controller = {
    list: async (req, res) => {
        try {
          const list = await ProductModel.find().lean();
          return res.json(list);
        } catch (error) {
          console.log(error);
        }
      },
      create: async (req, res) => {
        const validationResult = createProductSchema.validate(req.body);
      
        if (validationResult.error) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: ReasonPhrases.BAD_REQUEST,
            error: validationResult.error.message
          })
        }
      
        const { title, author, description, sasia, ngjyra, rating } = req.body;
      
        if (!req.file) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: ReasonPhrases.BAD_REQUEST,
            error: 'Image file is required'
          })
        }
      
        const { filename, mimetype, buffer } = req.file;
      
        try {
          // Save the file to the uploads directory
          const imagePath = path.join(UPLOADS_DIR, filename);
          await fs.promises.writeFile(imagePath, buffer);
      
          // Create a new product and save it to the database
          const newProduct = new ProductModel({
            title,
            author,
            description,
            sasia,
            ngjyra,
            rating,
            imageField: filename
          });
          const result = await newProduct.save();
      
          res.json({ success: true })
        } catch (err) {
          return res.json({
            message: StatusCodes.UNAUTHORIZED,
            error: err.message
          })
        }
      }
,      
    find: async(req, res) =>{
        try{
        const category = await ProductModel.findOne({_id: req.params.productId})
        if(!category) throw Error ("Kategoria nuk u gjet.")
            return res.json(category);
        } catch (error){
            return res.status(404).json({ error: error.message })
        }
    },
    edit: async (req, res) =>{
        await ProductModel.updateOne({ _id: req.params.productId }, req.body )
    
        const updatedProduct = await ProductModel.find({ _id: req.params.productId })
        
        return res.json(updatedProduct)
    },
    delete: async(req, res) =>{
        const productId = req.params.productId;
        console.log(productId)
       try  {
            await ProductModel.deleteOne({_id: productId});
            res.json({deleted: true})
       }catch (err){
            res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND});
       }
    
    }
      
}

export default controller;