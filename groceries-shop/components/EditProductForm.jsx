"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm({ id, name, price }) {
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newPrice }),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Product Name"
      />

      <input
        onChange={(e) => setNewPrice(e.target.value)}
        value={newPrice}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Product Price"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Product
      </button>
    </form>
  );
}