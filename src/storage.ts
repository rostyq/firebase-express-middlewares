import type { Handler } from "express";

export function setStorage(): Handler {
  return async (req, _res, next) => {
    const { getStorage } = await import("firebase-admin/storage");
    req.firebase!.storage = getStorage(req.firebase!.app);

    next();
  }
}
