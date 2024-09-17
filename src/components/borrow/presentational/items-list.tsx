import ItemCard from "@/components/borrow/presentational/item-card";
import { IItemGroup } from "@/lib/interfaces";

export default function ItemsList({ items }: { items: IItemGroup[] }) {
  return (
    <>
      {items.map((item, index) => (
        <ItemCard key={index} props={{ item }} />
      ))}
    </>
  );
}
