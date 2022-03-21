import { Timestamp } from "firebase/firestore";

export interface Post {
  title: string,
  description: string,
  id: string,
  createdAt: Timestamp
}
