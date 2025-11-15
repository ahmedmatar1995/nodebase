"use client";


import React from 'react'
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

function page() {
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.getUsers.queryOptions());

  return (
    <div>
      <p>home page</p>
      <p>{JSON.stringify(users)}</p>

    </div>
  )
}

export default page