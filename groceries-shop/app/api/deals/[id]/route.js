import connectMongoDB from "@/libs/mongodb";
import Deal from "@/models/deal";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const {id} = params;
    const { newName: name, newDescription: description ,newProductsName: productsName} = await request.json();
    await connectMongoDB();
    await Deal.findByIdAndUpdate(id, {name,description,productsName});
    return NextResponse.json({message:"Deal updated"}, {status:200});
}

export async function GET(request, { params }){
    const {id} = params;
    await connectMongoDB();
    const deal = await Deal.findOne({_id: id});
    return NextResponse.json({ deal }, {status:200});
}