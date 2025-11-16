import { requireAuth } from "@/lib/auth-utils";
import React from "react";

async function page() {
  await requireAuth();
  return (
    <div>
      <p>executions page</p>
    </div>
  );
}

export default page;
