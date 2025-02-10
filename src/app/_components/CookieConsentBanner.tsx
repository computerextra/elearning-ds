"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Datenschutz from "@/markdown/Datenschutz.mdx";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import CookieConsent, {
  getCookieConsentValue,
  resetCookieConsentValue,
} from "react-cookie-consent";

type CookieTable = {
  Name: string;
  Grund: string;
  Typ: string;
  Speicherdauer: string;
};

const EssentialCookies: CookieTable[] = [
  {
    Name: "DatenschutzTrainingCookieConsent",
    Grund: "Speichert ob optionale Cookies akzeptiert wurden",
    Typ: "Boolean (ja/nein)",
    Speicherdauer: "1 Jahr",
  },
  {
    Name: "authjs.callback-url",
    Grund: "Callback URL für die Benutzer Authentifizierung",
    Typ: "URL / Link",
    Speicherdauer: "Ende der Session",
  },
  {
    Name: "authjs.csrf-token",
    Grund: "Cross Site Request Forgery Token",
    Typ: "Text",
    Speicherdauer: "Ende der Session",
  },
  {
    Name: "authjs.session-token",
    Grund: "Session Token",
    Typ: "Text",
    Speicherdauer: "1 Monat",
  },
];

const StatistikCookies: CookieTable[] = [];
const DrittanbieterCookies: CookieTable[] = [];

export default function CookieConsentBanner() {
  const [optionaleCookies, setOptionaleCookies] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = getCookieConsentValue("DatenschutzTrainingCookieConsent");
    if (consent == "true") setShowSettings(true);
    else setShowSettings(false);
  }, []);

  const onAccept = () => {
    console.log("Accepted");
    setShowSettings(true);
  };
  const onDecline = () => {
    console.log("Declined Optional Cookies");
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText={
          optionaleCookies.length != optionaleCookies.length
            ? "Ausgewähle Cookies Akzeptieren"
            : "Alle Akzeptieren"
        }
        declineButtonText="Alle optionalen Ablehnen"
        enableDeclineButton
        overlay
        cookieName="DatenschutzTrainingCookieConsent"
        containerClasses=""
        expires={365}
        onAccept={onAccept}
        onDecline={onDecline}
      >
        <div className="container">
          <h2>Nutzung von Cookies: Wir benötigen Ihre Einwilligung</h2>
          <p>
            Wir verwenden auf dieser Webseite Cookies. Diese verarbeiten auf
            personenbezogene Daten.
          </p>
          <p>Zum Einsatz kommen auf unserer Seite:</p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Technisch Notwendige Cookues</li>
            <li>Statistik Cookies</li>
            <li>Cookies von Drittanbietern</li>
          </ul>
          <p>
            Indem Sie auf die untere Tabelle klicken, erhalten Sie genauere
            Informationen zu unseren Cookies und können diese nach Ihren eigenen
            Bedürfnissen anpassen.
          </p>
          <p>
            Durch einen Klick auf das Auswahlfeld &quot;Alle Akzeptieren&quot;
            stimmen Sie der Verwendung aller Cookies zu, die in der unteren
            Tabelle beschrieben werden.
          </p>
          <p>
            Sie können Ihre Einwilligung zur Nutzung von Cookies zu jeder Zeit
            ändern oder widerrufen
          </p>
          <p>
            Weitere Informationen finden Sie in unserer Datenschutzerklärung
          </p>
          {show ? (
            <>
              <h1>Datenschutzerklärung</h1>
              <Datenschutz />
              <Button
                onClick={() => setShow(false)}
                variant="destructive"
                className="mt-4"
              >
                <CircleX className="h-12 w-12" /> Schließen
              </Button>
            </>
          ) : (
            <></>
          )}
          <hr className="my-4" />
          <CookieOverview setOptionaleCookies={setOptionaleCookies} />
        </div>
      </CookieConsent>
      {showSettings && (
        <Button
          className="fixed bottom-7 right-7"
          variant="outline"
          onClick={() => {
            resetCookieConsentValue("DatenschutzTrainingCookieConsent");
            location.reload();
          }}
        >
          Cookie Einstellungen
        </Button>
      )}
    </>
  );
}

function CookieOverview({
  setOptionaleCookies,
}: {
  setOptionaleCookies: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div>
      <p>Folgende Cookies werden genutzt:</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Essentielle Cookies</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Auswahl</TableHead>
                  <TableHead className="w-[100px]">Name des Cookies</TableHead>
                  <TableHead>Grund für die Speicherung</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead className="text-right">
                    Maximale Speicherdauer
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EssentialCookies.map((cookie, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Switch
                        id={`${idx}-${cookie.Name}`}
                        defaultChecked={true}
                        disabled
                      />
                    </TableCell>
                    <TableCell className="font-medium">{cookie.Name}</TableCell>
                    <TableCell>{cookie.Grund}</TableCell>
                    <TableCell>{cookie.Typ}</TableCell>
                    <TableCell className="text-right">
                      {cookie.Speicherdauer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Statistik-Cookies</AccordionTrigger>
          <AccordionContent>
            {StatistikCookies.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auswahl</TableHead>
                    <TableHead className="w-[100px]">
                      Name des Cookies
                    </TableHead>
                    <TableHead>Grund für die Speicherung</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead className="text-right">
                      Maximale Speicherdauer
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {StatistikCookies.map((cookie, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Switch
                          id={`${idx}-${cookie.Name}`}
                          defaultChecked={true}
                          onCheckedChange={(e) => {
                            setOptionaleCookies((prev) => {
                              if (e) {
                                if (prev.includes(cookie.Name)) {
                                  return prev;
                                } else {
                                  const x = prev;
                                  x.push(cookie.Name);
                                  return x;
                                }
                              } else {
                                if (prev.includes(cookie.Name)) {
                                  const x = prev;
                                  const index = prev.findIndex(
                                    (y) => y === cookie.Name,
                                  );
                                  if (index > -1) {
                                    x.splice(index, 1);
                                    return x;
                                  } else {
                                    return prev;
                                  }
                                } else {
                                  return prev;
                                }
                              }
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {cookie.Name}
                      </TableCell>
                      <TableCell>{cookie.Grund}</TableCell>
                      <TableCell>{cookie.Typ}</TableCell>
                      <TableCell className="text-right">
                        {cookie.Speicherdauer}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>Es werden keine optionalen Statistik-Cookies gesetzt</p>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Cookies von Drittanbietern</AccordionTrigger>
          <AccordionContent>
            {DrittanbieterCookies.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auswahl</TableHead>
                    <TableHead className="w-[100px]">
                      Name des Cookies
                    </TableHead>
                    <TableHead>Grund für die Speicherung</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead className="text-right">
                      Maximale Speicherdauer
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DrittanbieterCookies.map((cookie, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Switch
                          id={`${idx}-${cookie.Name}`}
                          defaultChecked={true}
                          onCheckedChange={(e) => {
                            setOptionaleCookies((prev) => {
                              if (e) {
                                if (prev.includes(cookie.Name)) {
                                  return prev;
                                } else {
                                  const x = prev;
                                  x.push(cookie.Name);
                                  return x;
                                }
                              } else {
                                if (prev.includes(cookie.Name)) {
                                  const x = prev;
                                  const index = prev.findIndex(
                                    (y) => y === cookie.Name,
                                  );
                                  if (index > -1) {
                                    x.splice(index, 1);
                                    return x;
                                  } else {
                                    return prev;
                                  }
                                } else {
                                  return prev;
                                }
                              }
                            });
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {cookie.Name}
                      </TableCell>
                      <TableCell>{cookie.Grund}</TableCell>
                      <TableCell>{cookie.Typ}</TableCell>
                      <TableCell className="text-right">
                        {cookie.Speicherdauer}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>
                Es werden keine optionalen Cookies von Drittanbietern gesetzt
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
