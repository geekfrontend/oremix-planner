import { Timestamp } from "firebase/firestore";

export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: ROLE;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
