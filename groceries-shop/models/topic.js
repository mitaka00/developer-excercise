import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
        name:{
            type: String,
            require: [true, "Name is required"]
        },
        price: {
            type: Number,
            require:[true, "Price is required"]
        }
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;