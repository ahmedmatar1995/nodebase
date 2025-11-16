import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{
    executionId: string;
  }>;
}

async function page({ params }: Props) {
  await requireAuth();
  const { executionId } = await params;
  return (
    <div>
      <p>execution id: {executionId}</p>
    </div>
  );
}

export default page;
