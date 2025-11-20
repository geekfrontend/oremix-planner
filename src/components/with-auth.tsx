"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/configs/firebase";
import { Spinner } from "@/components/ui/spinner";
import { doc, getDoc } from "firebase/firestore";
import { ROLE, type User } from "@/types/user";
import { useUserStore } from "@/stores/user-store";

export default function WithAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const { setUser, clearUser } = useUserStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        clearUser();
        setReady(true);
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.data() as Partial<User> | undefined;
        const merged: User = {
          id: user.uid,
          email: user.email || "",
          name: data?.name ?? null,
          role: (data?.role as ROLE) ?? ROLE.USER,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
        };
        setUser(merged);
      } catch {
        const merged: User = {
          id: user.uid,
          email: user.email || "",
          name: null,
          role: ROLE.USER,
        };
        setUser(merged);
      } finally {
        setReady(true);
      }
    });
    return () => unsub();
  }, [router]);

  if (!ready) {
    return (
      <div className="flex h-svh w-full items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  return <>{children}</>;
}
