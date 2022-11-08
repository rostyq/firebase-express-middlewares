import type { Handler } from "express";

export function setDatabase(): Handler {
  return async (req, _res, next) => {
    const { getDatabase } = await import("firebase-admin/database");
    req.firebase!.database = getDatabase(req.firebase!.app);

    next();
  }
}
