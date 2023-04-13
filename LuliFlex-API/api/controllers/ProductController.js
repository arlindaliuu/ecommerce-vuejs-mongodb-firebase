import ProductModel from '../models/ProductModel.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import createProductSchema from '../validator/products/create.js';
import path from "path";
import fs from "fs";

const controller = {
    list: async (req, res) => {
        try {
          const list = await ProductModel.find().lean();
          return res.json(list);
        } catch (error) {
          console.log(error);
        }
      },
      listDiscount: async (req, res) => {
        try {
          const list = await ProductModel.find({ discount: true }).lean();
          return res.json(list);
        } catch (error) {
          console.log(error);
        }
      },
      // create: async (req, res) => {
      //   const validationResult = createProductSchema.validate(req.body);
      
      //   if (validationResult.error) {
      //     return res.status(StatusCodes.BAD_REQUEST).json({
      //       message: ReasonPhrases.BAD_REQUEST,
      //       error: validationResult.error.message
      //     })
      //   }
      
      //   const { title, author, description, sasia, ngjyra, rating } = req.body;
      
      //   try {
      //     // Create a new product and save it to the database
      //     const newProduct = new ProductModel({
      //       title,
      //       author,
      //       description,
      //       sasia,
      //       ngjyra,
      //       rating,
      //       // imageField: filename
      //     });
      //     const result = await newProduct.save();
      
      //     res.json({ success: true })
      //   } catch (err) {
      //     return res.json({
      //       message: StatusCodes.UNAUTHORIZED,
      //       error: err.message
      //     })
      //   }
      // }
      create: async (req, res) => {
        const validationResult = createProductSchema.validate(req.body);
        if (validationResult.error) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: ReasonPhrases.BAD_REQUEST,
            error: validationResult.error.message
          });
        }
            
          const { title, author, description, sasia, ngjyra, rating } = req.body;
      
          // Create a new product and set the `imageField` property to the uploaded file path.
          const newProduct = new ProductModel({
            title,
            author,
            description,
            sasia,
            ngjyra,
            rating,
            imageField: req.file ? req.file.path : null
          });

          const filePath = req.file ? req.file.path : null;
          if (filePath) {
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
          }
          
          newProduct.save()
            .then(product => {
              res.status(201).json({
                message: 'Product created successfully',
                product: product
              });
            })
            .catch(err => {
              res.status(500).json({
                message: 'Error creating product',
                error: err.message
              });
            });
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