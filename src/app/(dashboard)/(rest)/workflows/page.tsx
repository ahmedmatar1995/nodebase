import React, { Suspense } from "react";
import { requireAuth } from "@/lib/auth-utils";
import {
  WorkFlowsContainer,
  WorkFlowsError,
  WorkFlowsList,
  WorkFlowsLoading,
} from "@/features/workflows/components/workflows";
import { prefetchWorkFlows } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs/server";
import { workFlowsParamsLoader } from "@/features/workflows/server/params-loader";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function page({ searchParams }: Props) {
  await requireAuth();
  const params = await workFlowsParamsLoader(searchParams);
  prefetchWorkFlows(params);

  return (
    <WorkFlowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkFlowsError />}>
          <Suspense fallback={<WorkFlowsLoading />}>
            <WorkFlowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkFlowsContainer>
  );
}

export default page;
