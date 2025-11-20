"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/firebase";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const email = (form.querySelector("#email") as HTMLInputElement)
                ?.value;
              const password = (
                form.querySelector("#password") as HTMLInputElement
              )?.value;
              setError(null);
              setLoading(true);
              try {
                await signInWithEmailAndPassword(auth, email, password);
                router.replace("/dashboard");
              } catch (err) {
                setError("Incorrect email or password");
              } finally {
                setLoading(false);
              }
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Sign in to your Ore Mix Planner account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  placeholder="*****"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </Field>
              {error ? (
                <FieldDescription className="text-destructive">
                  {error}
                </FieldDescription>
              ) : null}

              <FieldDescription className="text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Ore Mix Planner. All rights
                reserved.
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/login/ore-mix-illustration.svg"
              alt="Ore Mix Planner — industrial analytics illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </FieldDescription>
    </div>
  );
}
