import { User } from "@/type/user";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
