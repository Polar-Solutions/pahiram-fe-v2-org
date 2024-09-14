import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabsStore } from '@/hooks/request/useTabs';

interface TabOption {
  values: string[];  // Array of tab values
  onTabChange: (value: string) => void;  // Callback for tab change
}

export default function FilterTabs({ values = [], onTabChange }: TabOption) {
  const [defaultTab, setDefaultTab] = useState(values[0]);
  const { selectedFilterTab } = useTabsStore();

  useEffect(() => {
    if (values.includes(selectedFilterTab)) {
      setDefaultTab(selectedFilterTab);
    }
  }, [selectedFilterTab, values,]);

  const activeTab = (value: string) => {
    return selectedFilterTab === value
      ? 'bg-black text-white font-bold' // Style for active tab (pressed effect)
      : 'bg-transparent'; // Style for inactive tab
  }


  return (
    <Tabs defaultValue={values[0]} onValueChange={onTabChange}>
    <TabsList>
      {values.map((value) => (
        <TabsTrigger 
        key={value} 
        value={value} 
        className={`rounded-lg transition-all ${activeTab(value)}`}

      >
        {value}
      </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
  );
}