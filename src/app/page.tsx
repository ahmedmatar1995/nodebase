
import React from 'react'
import prisma from '@/lib/db'

async function page() {
  const users = await prisma.user.findMany();
  console.log(users);
  return (
    <div>
      <p>home page</p>

    </div>
  )
}

export default page