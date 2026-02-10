"use client";
import OverviewCard from "@/components/OverviewCard";
import React from "react";
import { get } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/getUserRole`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        },
      );

      if (!userRole.ok) {
        router.replace("/signin");
        return;
      }

      const roleRes = await userRole.json();
      if (roleRes.data != "ADMIN") {
        router.replace("/signin");
        return;
      }
    };
    fetchUserRole();
  }, [router]);
  return (
    <div className="h-screen ">
      <OverviewCard />
    </div>
  );
};

export default page;
