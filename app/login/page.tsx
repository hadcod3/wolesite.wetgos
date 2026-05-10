import LoginPage from "@/components/reusable/LoginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}