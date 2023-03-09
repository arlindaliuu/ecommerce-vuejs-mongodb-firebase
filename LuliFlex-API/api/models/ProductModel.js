import mongoose from "mongoose";

const schema = mongoose.Schema({
    title:String,
    author:String,
    description: String,
    sasia: Number,
    ngjyra: Array,
    rating: Number,
    imageField: String 
});

const model = mongoose.model("Model", schema, "product");
export default model;