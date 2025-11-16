import React from "react";
import { requireAuth } from "@/lib/auth-utils";

async function page() {
  await requireAuth();
  return (
    <div>
      <p>Workflows Page</p>
    </div>
  );
}

export default page;
