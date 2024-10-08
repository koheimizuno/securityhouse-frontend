"use client";

import React, { useState } from "react";
import Link from "next/link";

import Container from "@/components/layout/Container";
import Input from "@/components/form/InputText";
import Button from "@/components/common/Button";
import PageHeader from "@/components/common/PageHeader";

import { validateEmail } from "@/utils/validateUtils";

const Register = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.id) newErrors.id = "IDは必須です";
    if (!formData.email) newErrors.email = "メールアドレスは必須です";
    else if (!validateEmail(formData.email))
      newErrors.email = "有効なメールアドレスを入力してください";
    if (!formData.password) newErrors.password = "パスワードは必須です";
    else if (formData.password.length < 8)
      newErrors.password = "パスワードは8文字以上である必要があります";
    if (formData.password !== formData.passwordConfirm)
      newErrors.passwordConfirm = "パスワードが一致しません";

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <Container className="py-20">
      <form
        className="flex flex-col gap-8 max-w-[450px] m-auto"
        onSubmit={handleSubmit}
      >
        <PageHeader title="新規登録" className="text-center" />
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">ID</span>
          <Input name="id" onChange={handleChange} placeholder="ID" />
          {errors.id && (
            <span className="text-danger text-sm">{errors.id}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">メールアドレス</span>
          <Input
            name="email"
            onChange={handleChange}
            placeholder="メールアドレス"
          />
          {errors.email && (
            <span className="text-danger text-sm">{errors.email}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">パスワード</span>
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="パスワード"
          />
          {errors.password && (
            <span className="text-danger text-sm">{errors.password}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">パスワード確認</span>
          <Input
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
            placeholder="パスワード確認"
          />
          {errors.passwordConfirm && (
            <span className="text-danger text-sm">
              {errors.passwordConfirm}
            </span>
          )}
        </label>
        <Button type="submit" size="lg" value="登録" />
        <p className="text-sm text-center">
          アカウントをお持ちの場合は
          <Link href="/login" className="underline">
            こちら
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default Register;
