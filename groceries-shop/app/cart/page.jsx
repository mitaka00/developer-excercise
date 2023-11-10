import CartInfo from "@/components/CartInfo";

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

const getDeals = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/deals", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch deals");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading deals: ", error);
    }
  };

export default async function Cart() {
    const { products } =  await getProducts();
    const { deals } =  await getDeals();
    return <CartInfo deals = {deals} products = {products} />;
}