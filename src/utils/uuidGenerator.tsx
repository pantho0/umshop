import { v4 as uuidv4 } from "uuid";
export const generateUUID = (): string => {
  const prefix = "UMSHP-";
  const idLength = 12;
  const rawUUID = uuidv4().replace(/-/g, "");
  const uniqueID = rawUUID.substring(0, idLength).toUpperCase();
  return prefix + uniqueID;
};
