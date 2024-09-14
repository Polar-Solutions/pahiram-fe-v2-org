'use client'
import React from 'react';
import RequestCard from '@/components/request/presentational/request-card';

export default function RequestList({ selectedTab }: { selectedTab: string }) {
  return (
    <>
      <RequestCard statusFilter={selectedTab} />
    </>
  );
}