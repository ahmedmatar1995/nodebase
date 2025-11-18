"use client";

import React from "react";
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-components";
import {
  useCreateWorkFlow,
  useSuspenseWorkFlows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkFlowParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";

export const WorkFlowsSearch = () => {
  const [params, setParams] = useWorkFlowParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      placeholder="Search Workflow"
      value={searchValue}
      onChange={onSearchChange}
    />
  );
};

export const WorkFlowsList = () => {
  const workflows = useSuspenseWorkFlows();

  return <div>{JSON.stringify(workflows, null, 2)}</div>;
};

export const WorkFlowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkFlow = useCreateWorkFlow();
  const { modal, handleError } = useUpgradeModal();

  return (
    <>
      {modal}
      <EntityHeader
        title="WorkFlows"
        description="Create and manage your WorkFlows"
        onNew={() =>
          createWorkFlow.mutate(undefined, {
            onError: (error) => {
              handleError(error);
            },
          })
        }
        newButtonLabel="New WorkFlow"
        disabled={disabled}
        isCreating={createWorkFlow.isPending}
      />
    </>
  );
};

export const WorkFlowsPagination = () => {
  const workFlows = useSuspenseWorkFlows();
  const [params, setParams] = useWorkFlowParams();

  return (
    <EntityPagination
      disabled={workFlows.isFetching}
      totalPages={workFlows.data.totalPages}
      page={workFlows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
};

export const WorkFlowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkFlowsHeader />}
      search={<WorkFlowsSearch />}
      pagination={<WorkFlowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
