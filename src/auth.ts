import type { Handler } from "express";
import type {} from ".";

export function setAuth(): Handler {
  return async (req, _res, next) => {
    const { getAuth } = await import("firebase-admin/auth");
    req.firebase!.auth = getAuth(req.firebase!.app);

    next();
  }
}

export function verifyIdToken(checkRevoked?: boolean): Handler {
  return async (req, _res, next) => {
    const header = req.header("authorization");

    if (!header) {
      return next();
    }

    const [method, token] = header.split(" ");

    if (method != "Bearer") {
      return next();
    }

    const decoded = await req.firebase!.auth!.verifyIdToken(token, checkRevoked);

    req.auth = {
      token,
      decoded
    }

    next();
  }
}

export function verifySessionCookie(checkRevoked?: boolean, name?: string): Handler {
  return async (req, _res, next) => {
    const session = req.cookies["session" || name];

    if (!session) {
      return next();
    }

    const decoded = await req.firebase!.auth!.verifySessionCookie(session, checkRevoked);

    req.auth = {
      session,
      decoded
    }

    next();
  }
}
