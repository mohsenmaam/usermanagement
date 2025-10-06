import { useState, useCallback } from 'react';
import { CreateUserDTO, UpdateUserDTO, User } from '@/types/user.types';
import userService from '@/services/user.service';

/**
 * Custom Hook برای مدیریت فرم کاربر
 * مدیریت state فرم، اعتبارسنجی و ارسال
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
   * اعتبارسنجی داده‌های فرم
   */
  const validateForm = useCallback((data: Record<string, string>): boolean => {
    const errors: Record<string, string> = {};

    // اعتبارسنجی نام
    if (!data.name || data.name.trim().length < 3) {
      errors.name = 'نام باید حداقل 3 کاراکتر باشد';
    } else if (data.name.trim().length > 50) {
      errors.name = 'نام نباید بیشتر از 50 کاراکتر باشد';
    }

    // اعتبارسنجی نام کاربری
    if (!data.username || data.username.trim().length < 3) {
      errors.username = 'نام کاربری باید حداقل 3 کاراکتر باشد';
    } else if (data.username.trim().length > 30) {
      errors.username = 'نام کاربری نباید بیشتر از 30 کاراکتر باشد';
    } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
      errors.username = 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد و _ باشد';
    }

    // اعتبارسنجی ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'لطفاً یک آدرس ایمیل معتبر وارد کنید';
    } else if (data.email.length > 100) {
      errors.email = 'ایمیل نباید بیشتر از 100 کاراکتر باشد';
    }

    // اعتبارسنجی شماره تلفن
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      errors.phone = 'لطفاً یک شماره تلفن معتبر وارد کنید';
    } else if (data.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'شماره تلفن باید حداقل 10 رقم باشد';
    }

    // اعتبارسنجی وبسایت (اختیاری)
    if (data.website && data.website.trim()) {
      const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
      if (!urlRegex.test(data.website)) {
        errors.website = 'لطفاً یک آدرس وبسایت معتبر وارد کنید';
      }
    }

    // اعتبارسنجی شهر (اختیاری)
    if (data.city && data.city.trim().length < 2) {
      errors.city = 'نام شهر باید حداقل 2 کاراکتر باشد';
    }

    // اعتبارسنجی نام شرکت (اختیاری)
    if (data.companyName && data.companyName.trim().length < 2) {
      errors.companyName = 'نام شرکت باید حداقل 2 کاراکتر باشد';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, []);

  /**
   * ایجاد کاربر جدید
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
      setError(err instanceof Error ? err.message : 'ایجاد کاربر با خطا مواجه شد');
      return false;
    } finally {
      setLoading(false);
    }
  }, [validateForm, onSuccess]);

  /**
   * به‌روزرسانی کاربر موجود
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
      setError(err instanceof Error ? err.message : 'به‌روزرسانی کاربر با خطا مواجه شد');
      return false;
    } finally {
      setLoading(false);
    }
  }, [validateForm, onSuccess]);

  /**
   * پاک کردن خطاهای اعتبارسنجی
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
