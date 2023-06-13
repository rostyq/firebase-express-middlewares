declare global {
  export namespace Express {
    export interface FirebaseServices {
      appCheck?: import("firebase-admin/app-check").AppCheck,
      auth?: import("firebase-admin/auth").Auth,
      firestore?: import("firebase-admin/firestore").Firestore,
      database?: import("firebase-admin/database").Database,
      storage?: import("firebase-admin/storage").Storage,
      bucket?: import("@google-cloud/storage").Bucket,
      functions?: import("firebase-admin/functions").Functions,
    }

    export interface FirebaseConfig {
      name?: string,
      app?: import("firebase-admin/app").AppOptions,
      firestore?: import("firebase-admin/firestore").Settings,
    }

    export interface FirebaseUser {
      token?: string;
      session?: string;
      decoded?: import("firebase-admin/auth").DecodedIdToken;
      record?: import("firebase-admin/auth").UserRecord;
    }

    export interface FirebaseExtension extends FirebaseServices {
      config?: FirebaseConfig,
      app?: import("firebase-admin/app").App,
      user?: FirebaseUser,
    }

    export interface Request {
      firebase?: FirebaseExtension,
    }
  }
}

import type { Handler } from "express";

export function initFirebase(config?: Express.FirebaseConfig): Handler {
  return async (req, _res, next) => {
    const { getApp, initializeApp } = await import("firebase-admin/app");

    const firebase: Express.FirebaseExtension = req.firebase = { config };

    try {
      firebase.app = getApp(config?.name);
    } catch (_err) {
      firebase.app = initializeApp(config?.app, config?.name);
    }

    next();
  }
}

export * from "./services";
export * from "./auth";
export * from "./storage";