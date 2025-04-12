import { RegisterFormValues } from '@/types/form'

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>

export const useValidation = () => {
  const validate = (data: RegisterFormValues): RegisterFormErrors => {
    const errors: RegisterFormErrors = {}

    if (!data.fullName.trim()) errors.fullName = 'Full name is required.'
    if (!data.email) errors.email = 'Email is required.'
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))
      errors.email = 'Invalid email format.'

    if (!data.password) {
      errors.password = 'Password is required.'
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(data.password)
    ) {
      errors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, and a special character.'
    }

    if (!data.confirmPassword) errors.confirmPassword = 'Confirm Password is required.'
    else if (data.password !== data.confirmPassword)
      errors.confirmPassword = 'Passwords do not match.'

    if (!data.gender) errors.gender = 'Gender is required.'
    if (!data.mobile) errors.mobile = 'Mobile number is required.'

    return errors
  }

  const validateLogin = (email: string, password: string): string | null => {
    if (!email) return 'Email is required.'
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return 'Invalid email format.'
    if (!password) return 'Password is required.'
    return null
  }

  return { validate ,validateLogin }
}
