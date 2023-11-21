import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export let globalRouter: AppRouterInstance;

export const injectRouter = (_router: AppRouterInstance) => {
  globalRouter = _router;
};
