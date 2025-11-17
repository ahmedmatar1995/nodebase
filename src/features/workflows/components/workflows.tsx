"use client";

import React from "react";
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import {
  useCreateWorkFlow,
  useSuspenseWorkFlows,
} from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

export const WorkFlowsList = () => {
  const workflows = useSuspenseWorkFlows();

  return <p>{JSON.stringify(workflows, null, 2)}</p>;
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

export const WorkFlowsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkFlowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
