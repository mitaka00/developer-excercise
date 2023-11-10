import connectMongoDB from "@/libs/mongodb";
import Deal from "@/models/deal";
import { NextResponse } from "next/server";

export async function POST(request){
    const {name, description, productsName} = await request.json();
    await connectMongoDB();
    await Deal.create({name,description,productsName});
    return NextResponse.json({message:"Deal created"}, {status:201});
}

export async function GET(){
    await connectMongoDB();
    const deals = await Deal.find();
    return NextResponse.json({deals});
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Deal.findByIdAndDelete(id);
    return NextResponse.json({message:"Deal deleted"}, {status:200});
}