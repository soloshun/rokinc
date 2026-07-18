"use client";

import { useEffect, useMemo, useState } from "react";

export type Currency = "USD" | "GHS" | "EUR";

export const CURRENCIES: Record<Currency, { label: string; locale: string }> = {
  USD: { label: "US Dollar", locale: "en-US" },
  GHS: { label: "Ghana Cedi", locale: "en-GH" },
  EUR: { label: "Euro", locale: "de-DE" },
};

const EURO_COUNTRIES = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

// Safety net if the rates API is unreachable — refreshed manually now and
// then. Live rates always win when available.
const FALLBACK_RATES: Record<Currency, number> = {
  USD: 1,
  GHS: 15.5,
  EUR: 0.92,
};

export function countryToCurrency(country: string): Currency {
  if (country === "GH") return "GHS";
  if (EURO_COUNTRIES.has(country)) return "EUR";
  return "USD";
}

/**
 * Detects the visitor's currency from their location and loads live USD
 * exchange rates from open.er-api.com (ExchangeRate-API's free open feed,
 * refreshed daily from central-bank data). The visitor can always override
 * the detected currency manually.
 */
export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [detected, setDetected] = useState<Currency | null>(null);
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/geo")
      .then((r) => r.json())
      .then(({ country }) => {
        if (cancelled || !country) return;
        const c = countryToCurrency(country);
        setDetected(c);
        setCurrency(c);
      })
      .catch(() => {});

    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || data?.result !== "success") return;
        const { GHS, EUR } = data.rates ?? {};
        if (typeof GHS === "number" && typeof EUR === "number") {
          setRates({ USD: 1, GHS, EUR });
          setLive(true);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const format = useMemo(() => {
    const formatter = new Intl.NumberFormat(CURRENCIES[currency].locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    return (usdAmount: number) => formatter.format(usdAmount * rates[currency]);
  }, [currency, rates]);

  return { currency, setCurrency, detected, format, live };
}
