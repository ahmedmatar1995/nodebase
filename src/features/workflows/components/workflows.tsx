"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  EmptyView,
  EntityContainer,
  EntityHeader,
  EntityItem,
  EntityList,
  EntityPagination,
  EntitySearch,
  ErrorView,
  LoadingView,
} from "@/components/entity-components";
import {
  useCreateWorkFlow,
  useRemoveWorkFlow,
  useSuspenseWorkFlows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useWorkFlowParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import type { WorkFlow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";

export const WorkFlowsSearch = () => {
  const [params, setParams] = useWorkFlowParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params: { ...params, page: String(params.page) },
    setParams: (newParams) =>
      setParams({ ...newParams, page: Number(newParams.page) }),
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

  if (workflows.data.items.length === 0) return <WorkFlowsEmpty />;

  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkFlowItem data={workflow} />}
    />
  );
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

export const WorkFlowsLoading = () => {
  return <LoadingView message="Loading WorkFlows" entity="workflows" />;
};

export const WorkFlowsError = () => {
  return <ErrorView message="Error Loading WorkFlows" />;
};

export const WorkFlowsEmpty = () => {
  const createWorkFlow = useCreateWorkFlow();
  const { handleError, modal } = useUpgradeModal();
  const handleCreate = () => {
    createWorkFlow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
    });
  };
  return (
    <EmptyView
      message="You haven't created any workflows yet"
      onNew={handleCreate}
    />
  );
};

export const WorkFlowItem = ({ data }: { data: WorkFlow }) => {
  const removeWorkFlow = useRemoveWorkFlow();
  const handleRemove = () => {
    console.log("workflow prepared to be removed");
    removeWorkFlow.mutate({ id: data.id });
  };
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
          {""} &bull;Created {""}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground" />
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkFlow.isPending}
    />
  );
};
