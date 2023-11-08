"use client";

import { useRouter } from "next/navigation";

export default function AddToCartBtn({ id }) {
  const router = useRouter();

  return (
    <button className="bg-white p-2">
      Add to Cart
    </button>
  );
}