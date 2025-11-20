"use client";

import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const NodeAddButton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size="sm"
      variant="outline"
      className="bg-background"
    >
      <PlusIcon />
    </Button>
  );
});

NodeAddButton.displayName = "NodeAddButton";
