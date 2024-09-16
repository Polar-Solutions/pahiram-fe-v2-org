'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { IBorrowRequest } from "@/lib/interfaces";
import { updateURLParams } from "@/helper/borrow/updateURLParams";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface BorrowRequestCardProps {
  borrow_request: IBorrowRequest;
}

export default function RequestCard({ props }: { props: BorrowRequestCardProps }) {
    const { borrow_request } = props;
    const router = useRouter();


    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="w-full h-full flex flex-col cursor-pointer group"
      >
        <Card
          onClick={() => {
            router.push(`/borrow/request/${borrow_request.id}`);
          }}
          className="w-full flex flex-row cursor-pointer hover:bg-[hsl(var(--primary))] group"
        >
          <CardHeader className="w-2/12">
              <img
                src={"/image-placeholder.png"}
                alt={borrow_request.custom_transac_id || "request"}
                className="rounded-lg"
              />
          </CardHeader>

          <CardContent className="w-2/3 p-4 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-semibold mb-2">{borrow_request.custom_transac_id}</h3>
                <p className="text-lg font-semibold mb-4">{borrow_request.department_acronym}</p>
                <span className="text-sm text-muted-foreground">{`Submitted ${borrow_request.created_at}`}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
}