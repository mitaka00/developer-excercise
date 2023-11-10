import AddDealForm from "@/components/AddDealForm";

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

export default async function AddDeal() {
    const { products } =  await getProducts();
    return <AddDealForm products = {products} />;
}
