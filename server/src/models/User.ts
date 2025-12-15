export type UserType = 'customer' | 'vendor' | 'admin' | null;

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

// In-memory user storage (replace with database later)
export class UserStore {
  private users: User[] = [];

  findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const user: User = {
      id: this.generateId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  update(id: string, updates: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date()
    };
    return this.users[userIndex];
  }

  delete(id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length < initialLength;
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
