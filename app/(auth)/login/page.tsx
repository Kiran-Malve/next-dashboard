"use client";

import LoginForm from '@/component/Form/Login';
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/store";
import { login } from "@/redux/userSlice";
import { setCookie } from 'cookies-next';
import React from 'react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (email: string, password: string) => {
    const storedUser = localStorage.getItem("registeredUser");
    if (!storedUser) {
      throw new Error("No registered user found.");
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email !== email || parsedUser.password !== password) {
      throw new Error("Invalid email or password.");
    }

    setCookie('token', 'dsdadas', {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    dispatch(login(parsedUser));
    router.push("/dashboard");
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}