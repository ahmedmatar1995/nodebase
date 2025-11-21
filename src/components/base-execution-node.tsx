"use client";

import { useCallback, memo, ReactNode } from "react";
import { type NodeProps, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { BaseNode, BaseNodeContent } from "./react-flow/base-node";
import { BaseHandle } from "./react-flow/base-handle";
import { WorkFlowNode } from "./workflow-node";

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  // status?: NodeStatus;
  onSettings: () => void;
  onDoubleClick: () => void;
}

export const BaseExecutionNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseExecutionNodeProps) => {
    const handleDelete = () => {};
    return (
      <WorkFlowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
        showToolbar
      >
        <BaseNode onDoubleClick={onDoubleClick}>
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image
                src={Icon}
                alt={name}
                className="size-5 object-contain rounded-sm"
              />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}
            <BaseHandle id="target-1" type="target" position={Position.Left} />
            <BaseHandle id="source-1" type="source" position={Position.Right} />
          </BaseNodeContent>
        </BaseNode>
      </WorkFlowNode>
    );
  }
);

BaseExecutionNode.displayName = "BaseExecutionNode";
