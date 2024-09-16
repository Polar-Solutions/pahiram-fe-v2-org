import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsStore } from '@/hooks/request/useTabs';

interface TabOption {
  values: { value: string; label: string }[];  // Array of objects with value and label
  onTabChange: (value: string) => void;  // Callback for tab change
}


export default function FilterTabs({ values = [], onTabChange }: TabOption) {
  const [defaultTab, setDefaultTab] = useState(values[0]?.value); // Set initial tab value
  const { selectedFilterTab } = useTabsStore();

  useEffect(() => {
    if (values.some(tab => tab.value === selectedFilterTab)) {
      setDefaultTab(selectedFilterTab);
    }
  }, [selectedFilterTab, values]);

  const activeTab = (value: string) => {
    return selectedFilterTab === value
      ? 'bg-black text-white font-bold' // Style for active tab (pressed effect)
      : 'bg-transparent'; // Style for inactive tab
  }


  return (
    <Tabs defaultValue={defaultTab} onValueChange={onTabChange}>
    <TabsList>
      {values.map(({ value, label }) => (
        <TabsTrigger
          key={value}
          value={value}
          className={`rounded-lg transition-all ${activeTab(value)}`}
        >
          {label}  {/* Display label instead of value */}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
  );
}