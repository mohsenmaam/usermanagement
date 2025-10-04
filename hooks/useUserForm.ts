import { useState, useCallback } from 'react';
import { CreateUserDTO, UpdateUserDTO, User } from '@/types/user.types';
import userService from '@/services/user.service';

/**
 * Custom Hook for User Form Management
 * Handles form state, validation, and submission
 */
interface UseUserFormProps {
  initialUser?: User;
  onSuccess?: (user: User) => void;
}

export const useUserForm = ({ initialUser, onSuccess }: UseUserFormProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  /**
   * Validate form data
   */
  const validateForm = useCallback((data: Record<string, string>): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!data.name || data.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }

    // Username validation
    if (!data.username || data.username.trim().length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  /**
   * Create a new user
   */
  const createUser = useCallback(async (formData: FormData): Promise<boolean> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    if (!validateForm(data)) {
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const userDTO: CreateUserDTO = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website || '',
        address: {
          city: data.city || '',
        },
        company: {
          name: data.companyName || '',
        },
      };

      const newUser = await userService.createUser(userDTO);
      onSuccess?.(newUser);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
      return false;
    } finally {
      setLoading(false);
    }
  }, [validateForm, onSuccess]);

  /**
   * Update an existing user
   */
  const updateUser = useCallback(async (id: number, formData: FormData): Promise<boolean> => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    if (!validateForm(data)) {
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const userDTO: UpdateUserDTO = {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
        address: {
          city: data.city,
        },
        company: {
          name: data.companyName,
        },
      };

      const updatedUser = await userService.updateUser(id, userDTO);
      onSuccess?.(updatedUser);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      return false;
    } finally {
      setLoading(false);
    }
  }, [validateForm, onSuccess]);

  /**
   * Clear validation errors
   */
  const clearErrors = useCallback(() => {
    setValidationErrors({});
    setError(null);
  }, []);

  return {
    loading,
    error,
    validationErrors,
    createUser,
    updateUser,
    clearErrors,
  };
};
