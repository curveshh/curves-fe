"use client";

import { useAuth } from "@/hooks/useAuth";
import { loginSchema, LoginValues } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { BaseFormInput } from "../../atoms/FormInput";
import { Button } from "../../ui";

export const LoginForm = () => {
  const { login } = useAuth();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
    },
  });

  const onSubmit = (values: LoginValues) => {
    login.mutate(values);
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="brand" href="/">
          <Image src="/images/logo.png" alt="Curves" width={209} height={64} />
        </Link>
        <div className="auth-heading">
          <h1>Đăng nhập</h1>
          <p>Chào mừng bạn quay trở lại Curves.</p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
            <BaseFormInput<LoginValues>
              name="email"
              label="Email"
              placeholder="Nhập email"
            />

            <BaseFormInput<LoginValues>
              name="password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
            />
            <Button type="submit" disabled={login.isPending}>
              {login.isPending ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
            </Button>
          </form>
        </FormProvider>
        <p className="auth-switch">
          Chưa có tài khoản?
          <Link href="/register">Đăng ký</Link>
        </p>
      </section>
    </main>
  );
};
