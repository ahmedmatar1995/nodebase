"use client";

import React, { useCallback } from "react";
import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./ui/sheet";
import { NodeType } from "@/generated/prisma/enums";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { InitialNode } from "./initial-node";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger Manually",
    description:
      "Runs the flow on clicking a button, Good for Getting Started Quickly",
    icon: MousePointerIcon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "Http Request",
    description: "Make an Http Request",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const NodeSelector = ({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) => {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();
  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        console.log(nodes);
        const hasManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );

        console.log(hasManualTrigger);

        if (hasManualTrigger) {
          toast.error("Only Manual Trigger Is Allowed");
          return;
        }

        setNodes((nodes) => {
          const hasInitialTrigger = nodes.some(
            (node) => node.type === NodeType.INITIAL
          );
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
          });

          const newNode = {
            id: createId(),
            data: {},
            position: flowPosition,
            type: selection.type,
          };

          if (hasInitialTrigger) {
            return [newNode];
          }

          return [...nodes, newNode];
        });

        onOpenChange(false);
      } else if (selection.type === NodeType.HTTP_REQUEST) {
        setNodes((nodes) => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
          });
          const newNode = {
            id: createId(),
            data: {},
            position: flowPosition,
            type: selection.type,
          };
          const hasInitialTrigger = nodes.some(
            (node) => node.type === NodeType.INITIAL
          );
          if (hasInitialTrigger) return [newNode];
          return [...nodes, newNode];
        });
      }
    },
    [setNodes, getNodes, onOpenChange, screenToFlowPosition]
  );
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>What triggers this workflow</SheetTitle>
          <SheetDescription>
            a trigger is a step that starts your workflow
          </SheetDescription>
        </SheetHeader>
        <div>
          {triggerNodes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:bordr-l-primary"
                onClick={() => handleNodeSelect(nodeType)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={nodeType.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">
                      {nodeType.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {nodeType.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div>
          {executionNodes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <div
                key={nodeType.type}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:bordr-l-primary"
                onClick={() => handleNodeSelect(nodeType)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={nodeType.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">
                      {nodeType.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {nodeType.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
