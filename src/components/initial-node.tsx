"use client";

import { useState, memo, type ReactNode } from "react";
import type { NodeProps } from "@xyflow/react";
import { PlaceholderNode } from "./react-flow/placeholder-node";
import { PlusIcon } from "lucide-react";
import { WorkFlowNode } from "./workflow-node";
import { NodeSelector } from "./node-selector";

export const InitialNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);
  return (
    <WorkFlowNode>
      <NodeSelector open={open} onOpenChange={setOpen}>
        <PlaceholderNode {...props} onClick={() => setOpen(true)}>
          <div className="cursor-pointer flex items-center justify-center">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </NodeSelector>
    </WorkFlowNode>
  );
});

InitialNode.displayName = "InitialNode";
