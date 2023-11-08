import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const {id} = params;
    const { newName: name, newPrice: price} = await request.json();
    await connectMongoDB();
    await Product.findByIdAndUpdate(id, {name,price});
    return NextResponse.json({message:"Product updated"}, {status:200});
}

export async function GET(request, { params }){
    const {id} = params;
    await connectMongoDB();
    const product = await Product.findOne({_id: id});
    return NextResponse.json({ product }, {status:200});
}