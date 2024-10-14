import React, {useEffect, useState} from 'react';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {endorserTransactionTab} from "@/signals/shared-signals";

interface TabOption {
    values: { value: string; label: string }[];  // Array of objects with value and label
    onTabChange: (value: string) => void;  // Callback for tab change
}


export default function ApproverFilterTabs({values = [], onTabChange}: TabOption) {
    const [defaultTab, setDefaultTab] = useState(values[0]?.value); // Set initial tab value

    useEffect(() => {
        if (values.some(tab => tab.value === endorserTransactionTab.value)) {
            setDefaultTab(endorserTransactionTab.value);
        }
    }, [endorserTransactionTab.value, values]);

    const activeTab = (value: string) => {
        return endorserTransactionTab.value === value
            ? 'bg-black text-white font-bold' // Style for active tab (pressed effect)
            : 'bg-transparent'; // Style for inactive tab
    }


    return (
        <Tabs defaultValue={defaultTab} onValueChange={onTabChange}>
            <TabsList>
                {values.map(({value, label}) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className={`rounded-lg transition-all ${activeTab(value)}`}
                    >
                        {label} {/* Display label instead of value */}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}