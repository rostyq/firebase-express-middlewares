import type { Handler } from "express";
import type { Settings } from "firebase-admin/firestore";

export function setFirestore(settings?: Settings): Handler {
  return async (req, _res, next) => {
    const { getFirestore } = await import("firebase-admin/firestore");
    const firestore = req.firebase!.firestore = getFirestore(req.firebase!.app);
    if (settings) {
      try {
        firestore.settings(settings);
      } catch (_err) { }
    }

    next();
  }
}
