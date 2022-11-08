import type { FirebaseError } from "firebase-admin";

export function firebaseError(code: string, message?: string): FirebaseError {
  const error: unknown = new Error(message);
  (<FirebaseError>error).code = code;
  return <FirebaseError>error;
}