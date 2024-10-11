"use client";

import React, { useState } from "react";
import SectionTitle from "../common/SectionTitle";
import InputText from "../form/InputText";
import TextAreaText from "../form/TextAreaText";
import Button from "../common/Button";

const ProfileEditContent = () => {
  const [formData, setFormData] = useState({
    avatar: "",
    display_name: "",
    bio: "",
  });
  const [errors, setErrors] = useState({
    avatar: "",
    display_name: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.display_name.trim()) {
      newErrors.display_name = "表示名は必須です";
      isValid = false;
    }

    if (formData.bio.length > 500) {
      newErrors.bio = "自己紹介は500文字以内で入力してください";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, submitting:", formData);
      // Add your submit logic here
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <>
      <SectionTitle title="プロフィール編集" />
      <form className="mt-4 flex flex-col gap-8" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">プロフィール画像</span>
          <InputText
            name="avatar"
            type="file"
            className="h-fit"
            placeholder="アップ"
            onChange={handleChange}
          />
          {errors.avatar && (
            <span className="text-danger text-sm">{errors.avatar}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">表示名</span>
          <InputText
            name="display_name"
            placeholder="山田太郎"
            onChange={handleChange}
          />
          {errors.display_name && (
            <span className="text-danger text-sm">{errors.display_name}</span>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold">自己紹介</span>
          <TextAreaText
            name="bio"
            placeholder="自己紹介を入力"
            onChange={handleChange}
          />
          {errors.bio && (
            <span className="text-danger text-sm">{errors.bio}</span>
          )}
        </label>
        <Button type="submit" size="lg" value="保存" />
      </form>
    </>
  );
};

export default ProfileEditContent;
