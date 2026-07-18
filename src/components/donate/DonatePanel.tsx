"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion";
import { CURRENCIES, useCurrency, type Currency } from "@/lib/currency";
import type { DonationMethod } from "@/lib/types";

// Impact amounts are defined in USD and converted to the visitor's currency.
const IMPACT = [
  { usd: 15, does: "feeds a family at an outreach" },
  { usd: 30, does: "sends school materials to an orphaned child" },
  { usd: 60, does: "covers medical support for a widow" },
  { usd: 150, does: "helps fund an entire community visit", plus: true },
];

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable — value is still visible to copy manually */
        }
      }}
      className="group mt-1 flex w-full items-center justify-between gap-3 rounded-xl bg-rok-50 px-4 py-3 text-left transition-colors hover:bg-rok-100"
      aria-label={`Copy ${value}`}
    >
      <span className="font-mono text-sm font-semibold tracking-wide text-rok-900">
        {value}
      </span>
      <span
        className={`shrink-0 text-xs font-semibold transition-colors ${
          copied ? "text-rok-600" : "text-rok-400 group-hover:text-rok-600"
        }`}
      >
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}

export function DonatePanel({ methods }: { methods: DonationMethod[] }) {
  const { currency, setCurrency, detected, format, live } = useCurrency();

  return (
    <div className="space-y-16">
      {/* currency switcher */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex rounded-full border border-rok-200 bg-white p-1 shadow-sm">
          {(Object.keys(CURRENCIES) as Currency[]).map((code) => (
            <button
              key={code}
              onClick={() => setCurrency(code)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                currency === code
                  ? "text-white"
                  : "text-ink-soft hover:text-rok-700"
              }`}
              aria-pressed={currency === code}
            >
              {currency === code && (
                <motion.span
                  layoutId="currency-pill"
                  className="absolute inset-0 rounded-full bg-rok-800"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative">{code}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-soft">
          {detected === currency && detected !== null
            ? `Showing ${CURRENCIES[currency].label} based on your location · `
            : ""}
          {live
            ? "converted at today's exchange rates"
            : "approximate conversion"}
        </p>
      </div>

      {/* impact strip */}
      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IMPACT.map((item) => (
          <StaggerItem key={item.usd}>
            <motion.div
              whileHover={{ y: -4 }}
              className="h-full rounded-2xl border border-rok-100 bg-white p-6 shadow-sm"
            >
              <p className="font-display text-2xl text-rok-800">
                {format(item.usd)}
                {item.plus ? "+" : ""}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.does}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* giving methods */}
      <Stagger
        className={`grid gap-6 ${methods.length > 2 ? "lg:grid-cols-3" : "mx-auto max-w-4xl lg:grid-cols-2"}`}
        gap={0.15}
      >
        {methods.map((method) => (
          <StaggerItem key={method.method}>
            <div className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-rok-100 transition-shadow duration-500 hover:shadow-lg hover:shadow-rok-900/10">
              <h3 className="font-display text-xl text-ink">{method.method}</h3>
              {method.extra && (
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-rok-500">
                  {method.extra}
                </p>
              )}
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Account name
                  </p>
                  <CopyValue value={method.accountName} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {method.accountNumber.includes("@")
                      ? "Email / Details"
                      : "Account details"}
                  </p>
                  <CopyValue value={method.accountNumber} />
                </div>
              </div>
              {method.note && (
                <p className="mt-5 border-t border-rok-50 pt-4 text-xs leading-relaxed text-ink-soft">
                  {method.note}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
