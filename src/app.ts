import type { Handler } from "express";
import type { App, AppOptions } from "firebase-admin/app";

export function setApp(appName?: string): Handler {
  return async (req, _res, next) => {
    const { getApp, initializeApp } = await import("firebase-admin/app");

    if (!req.firebase) req.firebase = {};

    let app: App;

    try {
      app = getApp(appName);
    } catch (_err) {
      app = initializeApp(req.firebase.appOptions, appName);
    }

    req.firebase.app = app;

    next();
  };
}

export function setAppOptions(options: AppOptions): Handler {
  return async (req, _res, next) => {
    if (!req.firebase) req.firebase = {};

    req.firebase!.appOptions = options;
    next();
  }
}

export function setAppCheck(): Handler {
  return async (req, _res, next) => {
    const { getAppCheck } = await import("firebase-admin/app-check");
    req.firebase!.appCheck = getAppCheck(req.firebase!.app);

    next();
  }
}