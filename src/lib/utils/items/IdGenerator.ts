import { nanoid } from "nanoid";

export const generateEntityId = (len: number = 21) => nanoid(len);