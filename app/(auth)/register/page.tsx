'use client'

import RegisterForm from "@/component/Form/Register";
import { RegisterFormValues } from '@/types/form'
import { useValidation } from '@/hooks/useValidation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Register() {
  const router = useRouter()
  const { validate } = useValidation()
  const [formData, setFormData] = useState<RegisterFormValues>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '' as 'male' | 'female' | 'other',
    mobile: ''
  })
  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({})
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSuccess('')

    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as Partial<RegisterFormValues>);
      setIsSubmitting(false)
      
      return
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Save to localStorage
      localStorage.setItem('registeredUser', JSON.stringify(formData))
      setSuccess('Registration successful! Redirecting to login...')
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      setErrors({ email: 'Registration failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RegisterForm
      formData={formData}
      errors={errors}
      success={success}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}