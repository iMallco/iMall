import prisma from '../lib/prisma';
import { UserType as PrismaUserType } from '@prisma/client';

// Re-export types for backwards compatibility
export type UserType = PrismaUserType | null;

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  userType: UserType;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: UserResponse;
  token?: string;
  error?: string;
}

// Database-backed user storage using Prisma
export class UserStore {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    return user as User | null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user as User | null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: userData.password,
        userType: userData.userType as PrismaUserType | null,
      }
    });
    return user as User;
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...(updates.name && { name: updates.name }),
          ...(updates.email && { email: updates.email.toLowerCase() }),
          ...(updates.password && { password: updates.password }),
          ...(updates.userType !== undefined && { userType: updates.userType as PrismaUserType | null }),
        }
      });
      return user as User;
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }

  // Helper to convert User to UserResponse (exclude password)
  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType
    };
  }
}

export const userStore = new UserStore();
