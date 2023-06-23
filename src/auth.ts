import type { Handler } from "express";

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

    req.firebase!.user = { ...req.firebase!.user, token };

    try {
      req.firebase!.user!.decoded = await auth.verifyIdToken(token, checkRevoked);
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

    req.firebase!.user = { ...req.firebase!.user, session };

    try {
      req.firebase!.user!.decoded = await auth.verifySessionCookie(session, checkRevoked);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export function getUser(): Handler {
  return async (req, _res, next) => {
    const uid = req.firebase?.user?.decoded?.uid;

    if (!uid) {
      return next();
    }

    try {
      req.firebase!.user!.record = await req.firebase!.auth!.getUser(uid);
      next();
    } catch (err) {
      next(err);
    }
  }
}