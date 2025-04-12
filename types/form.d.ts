export interface RegisterFormValues {
    fullName: string
    email: string
    password: string
    confirmPassword: string
    gender: 'male' | 'female' | 'other'
    mobile: string
  }