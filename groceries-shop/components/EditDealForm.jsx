"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditDealForm({ id, name, description, productsName, products}) {
  console.log(productsName);
  console.log(products.products);
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [checkedState, setCheckedState] = useState(new Array(products.products.length).fill(false).map((item,index)=>
  productsName.includes(products.products[index].name) === true ? !item: item));

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProductsName=new Array();
    checkedState.map((item, index) => {
        if(item == 1){
            newProductsName.push(products.products[index].name);
        }
      })

    try {
      const res = await fetch(`http://localhost:3000/api/deals/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newDescription, newProductsName }),
      });

      if (!res.ok) {
        throw new Error("Failed to update deal");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Deal Name"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Deal Description"
      />

    <div className="flex gap-4">
    {products.products.map((t,index) => (
       // eslint-disable-next-line react/jsx-key
       <div className="left-section">
       <input
         type="checkbox"
         id={`custom-checkbox-${index}`}
         name={t.name}
         value={t.name}
         checked={checkedState[index]}
         onChange={() => handleOnChange(index)}
       />
       <label htmlFor={`custom-checkbox-${index}`}>{t.name}</label>
     </div>
    ))}
    </div>  

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Edit Deal
      </button>
    </form>
  );
}