declare global {
  export namespace Express {
    export interface Firebase {
      app?: import("firebase-admin/app").App,
      appOptions?: import("firebase-admin/app").AppOptions,
      appCheck?: import("firebase-admin/app-check").AppCheck,

      auth?: import("firebase-admin/auth").Auth,

      firestore?: import("firebase-admin/firestore").Firestore,
      firestoreSettings?: import("firebase-admin/firestore").Settings,

      database?: import("firebase-admin/database").Database,

      storage?: import("firebase-admin/storage").Storage,

      functions?: import("firebase-admin/functions").Functions,
    }

    export interface Auth {
      token?: string;
      session?: string;
      decoded?: import("firebase-admin/auth").DecodedIdToken;
      user?: import("firebase-admin/auth").UserRecord;
    }

    export interface Request {
      firebase?: Firebase,
      auth?: Auth,
    }
  }
}

export { setApp, setAppCheck } from "./app";
export { setAuth, verifyIdToken, verifySessionCookie, getUser } from "./auth";
export { setDatabase } from "./database";
export { setFirestore, setFirestoreSettings } from "./firestore";
export { setFunctions } from "./functions";
export { setStorage } from "./storage";