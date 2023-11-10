import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="bg-white p-2" href={"/"}>
        Shop
      </Link>
      <Link className="bg-white p-2" href={"/addDeal"}>
        Add Deal
      </Link>
      <Link className="bg-white p-2" href={"/addProduct"}>
        Add Product
      </Link>
      <Link className="bg-white p-2" href={"/cart"}>
        Cart
      </Link>
    </nav>
  );
}