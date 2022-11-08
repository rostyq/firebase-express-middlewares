import type { Handler } from "express";

export function setFunctions(): Handler {
  return async (req, _res, next) => {
    const { getFunctions } = await import("firebase-admin/functions");
    req.firebase!.functions = getFunctions(req.firebase!.app);

    next();
  }
}
