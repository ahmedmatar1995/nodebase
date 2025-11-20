"use client";

import { useState, memo, type ReactNode } from "react";
import type { NodeProps } from "@xyflow/react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkFlowNode } from "./workflow-node";

export const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkFlowNode>
      <PlaceholderNode {...props} onClick={() => {}}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkFlowNode>
  );
});

InitialNode.displayName = "InitialNode";
