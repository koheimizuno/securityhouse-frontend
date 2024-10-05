"use client";

import React, { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import InputText from "@/components/form/InputText";
import Button from "@/components/common/Button";

const ChangePwContent = () => {
  const [formData, setFormData] = useState({
    current_pw: "",
    new_pw: "",
    new_pw_confirm: "",
  });
  const [errors, setErrors] = useState({
    current_pw: "",
    new_pw: "",
    new_pw_confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.current_pw.length < 8) {
      newErrors.current_pw = "現在のパスワードは8文字以上である必要があります";
      isValid = false;
    }

    if (formData.new_pw.length < 8) {
      newErrors.new_pw = "新しいパスワードは8文字以上である必要があります";
      isValid = false;
    }

    if (formData.new_pw !== formData.new_pw_confirm) {
      newErrors.new_pw_confirm =
        "新しいパスワードと確認用パスワードが一致しません";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, submit the data");
      // Add your submit logic here
    }
  };

  return (
    <>
      <SectionTitle title="アカウント設定" />
      <form className="mt-4 flex flex-col gap-8" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">現在のパスワード</span>
          <InputText
            type="password"
            name="current_pw"
            placeholder="現在のパスワードを入力"
            onChange={handleChange}
          />
          {errors.current_pw && (
            <span className="text-danger text-sm">{errors.current_pw}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">変更後のパスワード</span>
          <InputText
            type="password"
            name="new_pw"
            placeholder="変更後のパスワードを入力"
            onChange={handleChange}
          />
          {errors.new_pw && (
            <span className="text-danger text-sm">{errors.new_pw}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">変更後のパスワード（確認）</span>
          <InputText
            type="password"
            name="new_pw_confirm"
            placeholder="変更後のパスワード（確認）を入力"
            onChange={handleChange}
          />
          {errors.new_pw_confirm && (
            <span className="text-danger text-sm">{errors.new_pw_confirm}</span>
          )}
        </label>
        <Button type="submit" size="lg" value="保存する" />
      </form>
    </>
  );
};

export default ChangePwContent;
