export type UserRole = "admin" | "member" | "creator" | "guest";

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt?: number;
}

export interface User extends BaseUser {
  role: UserRole;
  profile?: {
    bio?: string;
    location?: string;
    isOnboarded?: boolean;
  };
}
