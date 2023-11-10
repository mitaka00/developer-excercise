import mongoose, {Schema} from "mongoose";

const dealSchema = new Schema({
        name:{
            type: String,
            require: [true, "Name is required"]
        },
        description:{
            type:String,
            require: [true, "Description is required"]
        },
        productsName: {
            type: []
        }
});

const Deal = mongoose.models.Deal || mongoose.model("Deal", dealSchema);

export default Deal;