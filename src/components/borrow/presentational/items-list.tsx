import ItemCard from "@/components/borrow/presentational/item-card";
import { IItem } from "@/lib/interfaces";

export default function ItemsList({ items }: { items: IItem[] }) {
  return (
    <>
      {items.map((item, index) => (
        <ItemCard key={index} props={{ item }} />
      ))}
    </>
  );
}
