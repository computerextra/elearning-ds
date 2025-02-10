import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

export default async function CookieSettings() {
  const Cookies = await cookies();

  if (Cookies.has("DatenschutzTrainingCookieConsent")) {
    return <Button variant="link">Cookie Einstellungen</Button>;
  }
}
