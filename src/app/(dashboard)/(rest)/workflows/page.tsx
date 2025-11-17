import React, { Suspense } from "react";
import { requireAuth } from "@/lib/auth-utils";
import {
  WorkFlowsContainer,
  WorkFlowsList,
} from "@/features/workflows/components/workflows";
import { prefetchWorkFlows } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";

async function page() {
  await requireAuth();
  prefetchWorkFlows();
  return (
    <WorkFlowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkFlowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkFlowsContainer>
  );
}

export default page;
