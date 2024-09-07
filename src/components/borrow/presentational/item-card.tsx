"use client";

import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card";
import Image from 'next/image';
import {IItem} from "@/lib/interfaces";
import {updateURLParams} from "@/helper/borrow/updateURLParams";
import {useRouter} from "next/navigation";
import {motion} from 'framer-motion';

interface IItemCardProps {
    item: IItem
    // setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    // setModalItem: React.Dispatch<React.SetStateAction<IItem | undefined>>
}

// TODO: Remove scrollbar when opened


export default function ItemCard({props}: { props: IItemCardProps }) {
    const {item} = props;
    const router = useRouter();

    const handleRequestClick = () => {
        const serializedItem = encodeURIComponent(JSON.stringify(item));
        const newUrl = updateURLParams({item: serializedItem, showModalItem: 1});
        router.push(newUrl);
    };


    return (
        <motion.div
            whileHover={{y: -5}}
            className="w-full h-full flex flex-col cursor-pointer group"
        >
            <Card onClick={() => {
                handleRequestClick()
            }} className="w-full h-full flex flex-col cursor-pointer hover:bg-[hsl(var(--primary))] group">
                <CardHeader className="p-0">
                    <div className="relative w-full aspect-[4/3]">
                        <Image
                            src={item.image || "/image-placeholder.png"}
                            alt={item.model_name || 'item'}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <h1 className="text-lg font-semibold mt-2 mb-1 dark:group-hover:text-primary-foreground">{item.model_name || 'Item Group (Item Model)'}</h1>
                    <p className="text-sm text-neutral-500 mb-2 line-clamp-2">
                        {item.description || 'No description available.'}
                    </p>
                    <CardDescription className="text-xs">
                        {/* <div className="flex items-center justify-between mb-2">
                            <span>{item.group_category_id || 'No category'}</span>
                        </div>
                        <span>{item.department || 'No office'}</span> */}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
}