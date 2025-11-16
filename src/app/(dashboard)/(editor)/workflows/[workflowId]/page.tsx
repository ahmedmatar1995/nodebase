import React from "react";

interface Props {
  params: Promise<{
    workflowId: string;
  }>;
}

async function page({ params }: Props) {
  const { workflowId } = await params;
  return (
    <div>
      <p>workflowId:{workflowId}</p>
    </div>
  );
}

export default page;
