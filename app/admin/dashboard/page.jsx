"use client";
import OverviewCard from "@/components/OverviewCard";
import React from "react";
import { get } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchUserRole = async () => {
      setIsLoading(true);
      const userRole = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`,
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
      setIsLoading(false);
    };
    fetchUserRole();
  }, [router]);
  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div>
          <AdminNavbar />
          <OverviewCard />
        </div>
      )}
    </div>
  );
};

export default page;
