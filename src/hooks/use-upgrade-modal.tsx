import { useState } from "react";
import { UpgradeModal } from "@/components/upgrade-modal";
import { TRPCClientError } from "@trpc/client";

export const useUpgradeModal = () => {
  const [open, setOpen] = useState(false);

  const handleError = (error: unknown) => {
    setOpen(true);
  };

  const modal = <UpgradeModal open={open} onOpenChange={setOpen} />;

  return { modal, handleError };
};
