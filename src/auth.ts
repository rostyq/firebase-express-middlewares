import type { Handler } from "express";
import type {} from ".";

export function setAuth(): Handler {
  return async (req, _res, next) => {
    const { getAuth } = await import("firebase-admin/auth");
    req.firebase!.auth = getAuth(req.firebase!.app);

    if (!req.auth) req.auth = {};

    next();
  }
}

export function verifyIdToken(checkRevoked?: boolean): Handler {
  return async (req, _res, next) => {
    const auth = req.firebase!.auth!;

    const header = req.header("authorization");

    if (!header) {
      return next();
    }

    const [method, token] = header.split(" ");

    if (method != "Bearer") {
      return next();
    }

    req.auth!.token = token;

    try {
      req.auth!.decoded = await auth.verifyIdToken(token, checkRevoked);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export function verifySessionCookie(checkRevoked?: boolean, name?: string): Handler {
  return async (req, _res, next) => {
    const auth = req.firebase!.auth!;
    const session = req.cookies[name || "session"];

    if (!session) {
      return next();
    }

    req.auth!.session = session;

    try {
      req.auth!.decoded = await auth.verifySessionCookie(session, checkRevoked);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export function getUser(): Handler {
  return async (req, _res, next) => {
    const auth = req.firebase!.auth!
    const uid = req.auth!.decoded!.uid;

    if (!uid) {
      return next();
    }

    try {
      req.auth!.user = await auth.getUser(uid);
      next();
    } catch (err) {
      next(err);
    }
  }
}