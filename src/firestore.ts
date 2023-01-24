import type { Handler } from "express";
import type { Settings } from "firebase-admin/firestore";

export function setFirestore(): Handler {
  return async (req, _res, next) => {
    const { getFirestore } = await import("firebase-admin/firestore");
    const firestore = req.firebase!.firestore = getFirestore(req.firebase!.app);
    const settings = req.firebase?.firestoreSettings;

    if (settings && !(<any>firestore)._settingsFrozen) {
      firestore.settings(settings);
    }

    next();
  }
}

export function setFirestoreSettings(settings: Settings): Handler {
  return async (req, _res, next) => {
    req.firebase!.firestoreSettings = settings;
    next();
  }
}
