import type { Handler } from "express";

export function auth(): Handler {
  return async (req, _res, next) => {
    const { getAuth } = await import("firebase-admin/auth");
    req.firebase!.auth = getAuth(req.firebase!.app);
    next();
  }
}

export function firestore(): Handler {
  return async (req, _res, next) => {
    const { getFirestore } = await import("firebase-admin/firestore");
    const firestore = req.firebase!.firestore = getFirestore(req.firebase!.app);
    const settings = req.firebase?.config?.firestore;

    if (settings && !(<any>firestore)._settingsFrozen) {
      firestore.settings(settings);
    }

    next();
  }
}

export function database(): Handler {
  return async (req, _res, next) => {
    const { getDatabase } = await import("firebase-admin/database");
    req.firebase!.database = getDatabase(req.firebase!.app);

    next();
  }
}

export function appCheck(): Handler {
  return async (req, _res, next) => {
    const { getAppCheck } = await import("firebase-admin/app-check");
    req.firebase!.appCheck = getAppCheck(req.firebase!.app);

    next();
  }
}

export function storage(): Handler {
  return async (req, _res, next) => {
    const { getStorage } = await import("firebase-admin/storage");
    req.firebase!.storage = getStorage(req.firebase!.app);

    next();
  }
}

export function bucket(name?: string): Handler {
  return async (req, _res, next) => {
    req.firebase!.bucket = req.firebase!.storage!.bucket(name);
    next();
  }
}

export function functions(): Handler {
  return async (req, _res, next) => {
    const { getFunctions } = await import("firebase-admin/functions");
    req.firebase!.functions = getFunctions(req.firebase!.app);

    next();
  }
}