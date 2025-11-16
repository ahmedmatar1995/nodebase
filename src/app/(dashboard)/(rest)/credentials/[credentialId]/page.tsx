import { requireAuth } from "@/lib/auth-utils";
import React from "react";

interface Props {
  params: Promise<{
    credentialId: string;
  }>;
}

async function page({ params }: Props) {
  await requireAuth();
  const { credentialId } = await params;
  return (
    <div>
      <p>credentialId:{credentialId}</p>
    </div>
  );
}

export default page;
