import Link from "next/link";
import RemoveBtnProduct from "./RemoveBtnProduct";
import { HiPencilAlt } from "react-icons/hi";
import AddToCartBtn from "./addToCartBtn";

const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading products: ", error);
  }
};

export default async function ProductsList() {
  const { products } = await getProducts();
  return (
    <div>
        <h2 className="font-bold text-3xl">Products</h2>
      {products.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2m">{t.name}</h2>
            <div>{t.price}</div>
          </div>

          <div className="flex gap-2">
            <AddToCartBtn id={t._id}/>
            <RemoveBtnProduct id={t._id} />
            <Link href={`/editProduct/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}