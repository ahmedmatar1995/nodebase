import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { Logout } from "@/features/auth/components/logout";
import { caller } from "@/trpc/server";

async function page() {
  await requireAuth();
  const users = await caller.getUsers();
  console.log(users);
  return (
    <div>
      <p>home page</p>
      <Logout />
    </div>
  );
}

export default page;
