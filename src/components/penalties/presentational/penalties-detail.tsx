import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";


const PenaltiesDetail = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Borrowing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Endorser</label>
                    <Input 
                        value={"Hello"} 
                        readOnly 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Purpose</label>
                    <Input 
                        value={"Hello"} 
                        readOnly 
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Specify Purpose</label>
                    <Input value={"Hello"} readOnly />
                </div>
            </CardContent>
        </Card>
    );
};

export default PenaltiesDetail;
