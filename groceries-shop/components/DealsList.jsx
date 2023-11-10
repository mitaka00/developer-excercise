import Link from "next/link";
import RemoveBtnDeal from "./RemoveBtnDeal";
import { HiPencilAlt } from "react-icons/hi";

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

export default async function DealsList() {
  const { deals } = await getDeals();

  return (
    <div>
    <h2 className="font-bold text-3xl">Deals</h2>
      {deals.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2m">{t.name}</h2>
            <h4>{t.description}</h4>
          </div>

          <div>
            <h5>These products are included in the deal:</h5>
            {t.productsName.map((p) => (
              <div key = {p}>{p}</div>
            ))}
          </div>

          <div className="flex gap-2">
            <RemoveBtnDeal id={t._id} />
            <Link href={`/editDeal/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}