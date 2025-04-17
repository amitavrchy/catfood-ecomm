"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { CartProvider } from "@/utils/CartContext";

export default function AppShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    // Monkey patch push/replace to detect Link clicks
    const originalPush = router.push;
    router.push = (...args) => {
      handleStart();
      return originalPush(...args).finally(() => {
        // fallback in case Next doesn't auto-trigger update
        setTimeout(() => handleEnd(), 500);
      });
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  // Also hide loader once pathname changes (route finished)
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <>
      {loading && <Loader />}
      <CartProvider>{children}</CartProvider>
    </>
  );
}
