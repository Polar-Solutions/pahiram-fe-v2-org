import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface RequestItem {
    id: number;
    name: string;
    purpose: string;
    dateSubmitted: string;
    status: string;
}

// Replace this with dynamic data in real scenarios
const mockData: RequestItem[] = [
    {
        id: 1,
        name: "ITRO-140966-090324-083015 (Approved)",
        purpose: "Something Purpose",
        dateSubmitted: "Submitted August 29, 2024",
        status: "Approved",
    },
    {
        id: 2,
        name: "ITRO-140966-090324-083015 (On Going)",
        purpose: "Something Purpose",
        dateSubmitted: "Submitted August 29, 2024",
        status: "On Going", 
    },
    {
      id: 3,
      name: "ITRO-140966-090324-083015 Pending",
      purpose: "Something Purpose",
      dateSubmitted: "Submitted August 29, 2024",
      status: "Pending", 
  },

];

export default function RequestCard({ statusFilter }: { statusFilter: string }) {
    const filteredData = mockData.filter(item => item.status === statusFilter);

    return (
        <>
        {filteredData.map((item) => (
          <Card key={item.id} className="w-full flex flex-row">
            <CardHeader className="w-2/12">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                Image Here
              </div>
            </CardHeader>
            <CardContent className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm font-semibold mb-2">{item.purpose}</p>
              </div>
              <span className="text-sm text-muted-foreground">{item.dateSubmitted}</span>
            </CardContent>

          </Card>

        ))}
      </>
    );
}