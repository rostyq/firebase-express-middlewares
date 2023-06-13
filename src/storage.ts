import type { Handler, Response } from "express";

export function bucketReadStream(): Handler {
  return async (req, res: Response<ReadableStream, { filename?: string }>, next) => {
    const filename = res.locals.filename;
    
    if (!filename || typeof filename !== "string") return next();

    const file = req.firebase!.bucket!.file(filename!);

    file.createReadStream()
      .once("error", err => next(err))
      .once("end", () => next())
      .pipe(res);
  }
}