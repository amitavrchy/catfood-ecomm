// components/RoleProtected.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleProtected({ children, allowedRoles }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signIn");
    } else if (
      status === "authenticated" &&
      !allowedRoles.includes(session?.user?.userType)
    ) {
      router.replace("/unauthorized");
    }
  }, [status, session, allowedRoles, router]);

  if (status === "loading") return <div>Loading...</div>;

  // While waiting or redirecting, don't flash the page content
  if (
    status === "unauthenticated" ||
    (status === "authenticated" &&
      !allowedRoles.includes(session?.user?.userType))
  ) {
    return null;
  }

  return <>{children}</>;
}
