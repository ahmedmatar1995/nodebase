"use client";

import { useCallback, memo, ReactNode } from "react";
import { type NodeProps, Position } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { BaseHandle } from "@/components/react-flow/base-handle";
import { WorkFlowNode } from "@/components/workflow-node";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  // status?: NodeStatus;
  onSettings: () => void;
  onDoubleClick: () => void;
}

export const BaseTriggerNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
    const handleDelete = () => {};
    return (
      <WorkFlowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
        showToolbar
      >
        <BaseNode
          onDoubleClick={onDoubleClick}
          className="rounded-l-2xl relative group"
        >
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

            <BaseHandle id="source-1" type="source" position={Position.Right} />
          </BaseNodeContent>
        </BaseNode>
      </WorkFlowNode>
    );
  }
);

BaseTriggerNode.displayName = "BaseTriggerNode";
