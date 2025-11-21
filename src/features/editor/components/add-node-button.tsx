"use client";

import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NodeSelector } from "@/components/node-selector";

export const NodeAddButton = memo(() => {
  const [open, setOpen] = useState(false);
  return (
    <NodeSelector open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => {}}
        size="sm"
        variant="outline"
        className="bg-background"
      >
        <PlusIcon />
      </Button>
    </NodeSelector>
  );
});

NodeAddButton.displayName = "NodeAddButton";
