"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import Container from "@/components/layout/Container";
import TabVertical from "@/components/common/TabVertical";
import ProfileEditContent from "@/components/profile/ProfileEditContent";
import EmailEditContent from "@/components/profile/EmailEditContent";
import ChangePwContent from "@/components/profile/ChangePwContent";

import { PROFILE_TAB } from "@/utils/constants";

const ProfileEdit = () => {
  const searchParams = useSearchParams();
  const [profileTab, setProfileTab] = useState<string>("1");

  useEffect(() => {
    const profileTab = searchParams.get("profile_tab");
    if (profileTab) {
      setProfileTab(profileTab);
    }
  }, [searchParams]);

  return (
    <Container className="py-12">
      <PageHeader title="アカウント設定" className="text-center" />
      <TabVertical queryKey="profile_tab" roomCat={PROFILE_TAB} gap={true}>
        <div className="w-full lg:w-[calc(100%-300px)] lg:px-10 pb-7  rounded-xl rounded-tl-none">
          {profileTab === "1" && <ProfileEditContent />}
          {profileTab === "2" && <EmailEditContent />}
          {profileTab === "3" && <ChangePwContent />}
        </div>
      </TabVertical>
    </Container>
  );
};

export default ProfileEdit;
