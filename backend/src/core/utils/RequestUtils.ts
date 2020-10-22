import { verifyToken } from "./JWTUtils";

export function getUIDByToken(token: string) {
  const id = verifyToken(token);

  return id;
}