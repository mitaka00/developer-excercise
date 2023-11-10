import EditDealForm from "@/components/EditDealForm";

const getDealById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/deals/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

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


export default async function EditDeal({ params }) {
  const { id } = params;
  const { deal }  = await getDealById(id);
  const { name, description, productsName } = deal;
  const products= await getProducts();

  return <EditDealForm id={id} name={name} description={description} productsName={productsName} products={products} />;
}