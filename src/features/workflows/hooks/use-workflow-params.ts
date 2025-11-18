import { useQueryStates } from "nuqs";
import { workFlowParams } from "../params";

export const useWorkFlowParams = () => {
  return useQueryStates(workFlowParams);
};
