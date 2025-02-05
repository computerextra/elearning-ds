"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({ href }: { href?: string }) {
  const router = useRouter();
  return (
    <Button onClick={() => (href ? router.push(href) : router.back())}>
      Zurück
    </Button>
  );
}
