import ApiService from './api.service';
import { User, CreateUserDTO, UpdateUserDTO } from '@/types/user.types';

/**
 * User Service - Following Open/Closed Principle
 * Extends ApiService for user-specific operations
 */
class UserService extends ApiService {
  private readonly endpoint = '/users';

  constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  /**
   * Fetch all users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.get<User[]>(this.endpoint);
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  /**
   * Fetch a single user by ID
   */
  async getUserById(id: number): Promise<User> {
    try {
      return await this.get<User>(`${this.endpoint}/${id}`);
    } catch (error) {
      throw new Error(`Failed to fetch user with ID: ${id}`);
    }
  }

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserDTO): Promise<User> {
    try {
      return await this.post<User>(this.endpoint, userData);
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  /**
   * Update an existing user
   */
  async updateUser(id: number, userData: UpdateUserDTO): Promise<User> {
    try {
      return await this.put<User>(`${this.endpoint}/${id}`, userData);
    } catch (error) {
      throw new Error(`Failed to update user with ID: ${id}`);
    }
  }

  /**
   * Partially update a user
   */
  async patchUser(id: number, userData: Partial<UpdateUserDTO>): Promise<User> {
    try {
      return await this.patch<User>(`${this.endpoint}/${id}`, userData);
    } catch (error) {
      throw new Error(`Failed to patch user with ID: ${id}`);
    }
  }

  /**
   * Delete a user
   */
  async deleteUser(id: number): Promise<void> {
    try {
      await this.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete user with ID: ${id}`);
    }
  }

  /**
   * Search users by name or email
   */
  async searchUsers(query: string): Promise<User[]> {
    try {
      const allUsers = await this.getAllUsers();
      const lowerQuery = query.toLowerCase();
      
      return allUsers.filter(user => 
        user.name.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      throw new Error('Failed to search users');
    }
  }
}

// Export singleton instance
export default new UserService();
