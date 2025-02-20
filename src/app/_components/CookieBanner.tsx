"use client";

import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export function cookieConsentGiven() {
  const consent = localStorage.getItem("cookie_consent");
  if (consent == null) {
    return "undecided";
  }

  return consent;
}

export default function CookieBanner() {
  const [consentGiven, setConsentGiven] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setConsentGiven(cookieConsentGiven());
    const consent = cookieConsentGiven();
    if (consent === "undecided" || consent === "") {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (!showModal) return;
    const modal = document.getElementById("cookie_modal") as HTMLDialogElement;
    if (modal == null) return;
    modal.showModal();
  }, [showModal]);

  useEffect(() => {
    if (consentGiven !== "all") return;

    // Set Optional Cookies here!
    // TODO: Implement optional cookies
  }, [consentGiven]);

  const handleAcceptAllCookies = () => {
    localStorage.setItem("cookie_consent", "all");
    setConsentGiven("all");
    const modal = document.getElementById("cookie_modal") as HTMLDialogElement;
    if (modal == null) return;
    modal.close();
    setShowModal(false);
  };

  const handleDeclinecookies = () => {
    localStorage.setItem("cookie_consent", "none");
    setConsentGiven("none");
    const modal = document.getElementById("cookie_modal") as HTMLDialogElement;
    if (modal == null) return;
    modal.close();
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <dialog id="cookie_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
                onClick={() => {
                  const modal = document.getElementById(
                    "cookie_modal",
                  ) as HTMLDialogElement;
                  if (modal == null) return;
                  modal.close();
                  setShowModal(false);
                }}
              >
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Wir nutzen Cookies</h3>
            <p className="py-4">
              {/* TODO: Text für Cookies */}
              BLA BLA BLA COOKIES
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <div className="mt-4 flex gap-4">
                  <Button variant="primary" onClick={handleAcceptAllCookies}>
                    Alle Akzeptieren
                  </Button>
                  <Button variant="error" onClick={handleDeclinecookies}>
                    Alle nicht notwendigen Ablehnen
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      ) : (
        <div className="tooltip tooltip-bottom" data-tip="Cookie Einstellungen">
          <Button
            variant="ghost"
            size="circle"
            onClick={() => setShowModal(true)}
          >
            <Cookie />
          </Button>
        </div>
      )}
    </>
  );
}
