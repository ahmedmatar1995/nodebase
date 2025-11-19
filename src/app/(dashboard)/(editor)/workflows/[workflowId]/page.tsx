import React, { Suspense } from "react";
import { prefetchWorkFlow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorView, LoadingView } from "@/components/entity-components";
import { Editor } from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";

interface Props {
  params: Promise<{
    workflowId: string;
  }>;
}

async function page({ params }: Props) {
  const { workflowId } = await params;
  prefetchWorkFlow(workflowId);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<ErrorView message="Error Loading View" />}>
        <Suspense fallback={<LoadingView message="Loading WorkFlow..." />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}

export default page;
