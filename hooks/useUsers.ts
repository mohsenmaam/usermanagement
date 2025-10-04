import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user.types';
import userService from '@/services/user.service';

/**
 * Custom Hook for User Management
 * Following Separation of Concerns
 */
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all users
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a user
   */
  const deleteUser = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await userService.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search users
   */
  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      fetchUsers();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await userService.searchUsers(query);
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    deleteUser,
    searchUsers,
  };
};
