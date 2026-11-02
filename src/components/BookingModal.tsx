"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { SALON_DATA } from "@/config/siteContent";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const SPECIALISTS = [
  { name: "Bimala Bajgain (Founder & Lead Artist)", role: "Master Aesthetician & Brow Specialist" },
  { name: "First Available Artist", role: "Certified BLUSH Specialist" },
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

export function BookingModal({
  isOpen,
  onClose,
  initialService,
}: BookingModalProps) {
  const [step, setStep] = useState<"service" | "specialist" | "datetime" | "details" | "success">("service");
  const [selectedService, setSelectedService] = useState<string>(initialService || "");
  const [prevInitialService, setPrevInitialService] = useState<string | undefined>(initialService);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>(SPECIALISTS[0].name);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientInfo, setClientInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  if (initialService !== prevInitialService) {
    setPrevInitialService(initialService);
    if (initialService) {
      setSelectedService(initialService);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep("service");
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setClientInfo({ fullName: "", phone: "", email: "", notes: "" });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Appointment Reservation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fffdfc] text-[#271e20] rounded-[2.5rem] overflow-hidden border border-white/90 shadow-2xl p-6 sm:p-10 space-y-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c96f8e]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e89ab2] to-[#c96f8e] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif tracking-[0.2em] text-sm uppercase text-[#271e20] font-semibold block">
                RESERVE AN APPOINTMENT
              </span>
              <span className="text-[10px] text-[#8e3f5c] tracking-wider uppercase font-medium">
                BLUSH — Texas Salon Sanctuary
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#f8f4f1] hover:bg-[#e89ab2]/20 text-[#271e20] transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vagaro Direct Link Banner */}
        <div className="p-4 rounded-2xl bg-[#f8f4f1] border border-[#c96f8e]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#5e5055]">
            <span className="font-semibold text-[#271e20] block">Prefer direct calendar booking?</span>
            Instant live slot confirmation available on Vagaro.
          </div>
          <a
            href={SALON_DATA.booking.vagaroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8e3f5c] hover:bg-[#6e273b] text-white text-xs uppercase tracking-wider font-semibold transition-all flex-shrink-0 self-start sm:self-auto"
          >
            <span>Book on Vagaro</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ─── STEP 1: SELECT SERVICE ─── */}
        {step === "service" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#271e20]">
                1. Select Your Ritual
              </h3>
              <p className="text-xs text-[#6e5f64]">
                Choose from our signature offerings or consultation package.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SALON_DATA.services.map((srv) => {
                const isSelected = selectedService === srv.name;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv.name)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${isSelected
                        ? "bg-[#f8f4f1] border-[#c96f8e] shadow-md ring-1 ring-[#c96f8e]"
                        : "bg-white hover:bg-[#f8f4f1]/50 border-[#c96f8e]/15"
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-[#8e3f5c] tracking-wider mb-1">
                        <span>{srv.category}</span>
                        {srv.duration && <span>{srv.duration}</span>}
                      </div>
                      <h4 className="font-serif text-base text-[#271e20] font-normal">
                        {srv.name}
                      </h4>
                    </div>
                    <div className="text-xs text-[#8e3f5c] font-semibold pt-2">
                      {srv.startingPrice}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                disabled={!selectedService}
                onClick={() => setStep("specialist")}
                className={`w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all ${selectedService
                    ? "bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white shadow-md cursor-pointer"
                    : "bg-[#f8f4f1] text-[#a69894] cursor-not-allowed"
                  }`}
              >
                <span>Continue to Specialist</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: SELECT SPECIALIST ─── */}
        {step === "specialist" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("service")}
                className="inline-flex items-center gap-1.5 text-xs text-[#8e3f5c] font-semibold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <span className="text-xs text-[#a69894]">Step 2 of 4</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#271e20]">
                2. Select Specialist
              </h3>
              <p className="text-xs text-[#6e5f64]">
                Service: <span className="font-semibold text-[#8e3f5c]">{selectedService}</span>
              </p>
            </div>

            <div className="space-y-3">
              {SPECIALISTS.map((spec) => {
                const isSelected = selectedSpecialist === spec.name;
                return (
                  <div
                    key={spec.name}
                    onClick={() => setSelectedSpecialist(spec.name)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${isSelected
                        ? "bg-[#f8f4f1] border-[#c96f8e] shadow-sm ring-1 ring-[#c96f8e]"
                        : "bg-white hover:bg-[#f8f4f1]/50 border-[#c96f8e]/15"
                      }`}
                  >
                    <div>
                      <h4 className="font-serif text-base text-[#271e20]">{spec.name}</h4>
                      <p className="text-xs text-[#6e5f64] font-light">{spec.role}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "border-[#8e3f5c] bg-[#8e3f5c] text-white" : "border-[#c96f8e]/30"
                        }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep("datetime")}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SELECT DATE & TIME ─── */}
        {step === "datetime" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("specialist")}
                className="inline-flex items-center gap-1.5 text-xs text-[#8e3f5c] font-semibold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <span className="text-xs text-[#a69894]">Step 3 of 4</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#271e20]">
                3. Preferred Date & Time
              </h3>
              <p className="text-xs text-[#6e5f64]">
                Select your preferred window for {selectedService}.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#271e20] mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-[#f8f4f1] border border-[#c96f8e]/20 text-sm text-[#271e20] focus:outline-none focus:border-[#8e3f5c]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#271e20] mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isSelected
                            ? "bg-[#8e3f5c] text-white shadow-sm"
                            : "bg-[#f8f4f1] hover:bg-[#e89ab2]/20 text-[#271e20] border border-[#c96f8e]/15"
                          }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep("details")}
                className={`w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all ${selectedDate && selectedTime
                    ? "bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white shadow-md cursor-pointer"
                    : "bg-[#f8f4f1] text-[#a69894] cursor-not-allowed"
                  }`}
              >
                <span>Continue to Client Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 4: CLIENT DETAILS ─── */}
        {step === "details" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep("datetime")}
                className="inline-flex items-center gap-1.5 text-xs text-[#8e3f5c] font-semibold hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <span className="text-xs text-[#a69894]">Final Step</span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-[#271e20]">
                4. Your Contact Details
              </h3>
              <p className="text-xs text-[#6e5f64]">
                We will send an SMS and email confirmation for your appointment.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep("success");
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-[#271e20] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Vance"
                  value={clientInfo.fullName}
                  onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#f8f4f1] border border-[#c96f8e]/20 text-sm focus:outline-none focus:border-[#8e3f5c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#271e20] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(469) 000-0000"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#f8f4f1] border border-[#c96f8e]/20 text-sm focus:outline-none focus:border-[#8e3f5c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#271e20] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#f8f4f1] border border-[#c96f8e]/20 text-sm focus:outline-none focus:border-[#8e3f5c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#271e20] mb-1">
                  Special Notes / Skin Sensitivities (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any skin conditions, styling preferences, or requests..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#f8f4f1] border border-[#c96f8e]/20 text-sm focus:outline-none focus:border-[#8e3f5c]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#e89ab2] via-[#c96f8e] to-[#8e3f5c] text-white text-xs uppercase tracking-[0.2em] font-semibold shadow-lg hover:opacity-95 transition-all cursor-pointer"
                >
                  Confirm Reservation Request
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── STEP 5: SUCCESS CONFIRMATION ─── */}
        {step === "success" && (
          <div className="space-y-6 text-center py-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#8e3f5c] text-white mx-auto flex items-center justify-center shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#271e20]">
                Reservation Request Received!
              </h3>
              <p className="text-sm text-[#6e5f64] max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#271e20]">{clientInfo.fullName}</span>. We have noted your request for <span className="font-semibold text-[#8e3f5c]">{selectedService}</span> on <span className="font-semibold text-[#271e20]">{selectedDate}</span> at <span className="font-semibold text-[#271e20]">{selectedTime}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#f8f4f1] border border-[#c96f8e]/15 text-xs text-[#5e5055] max-w-md mx-auto space-y-1">
              <p className="font-semibold text-[#271e20]">Our studio will confirm via text message shortly.</p>
              <p>For immediate changes, call {SALON_DATA.booking.phone}.</p>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-full bg-[#8e3f5c] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#6e273b] transition-all cursor-pointer"
            >
              Return to BLUSH Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
