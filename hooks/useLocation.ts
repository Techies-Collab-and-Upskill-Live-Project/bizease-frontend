"use client";

import { useEffect, useState } from "react";
import { Country, fetchCountries, fetchStates } from "@/services/location";

/**
 * Handles:
 *   • countries list (with currencies)
 *   • states for a selected country
 *   • loading flags
 */
export default function useLocation() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countryCode, setCountryCode] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchCountries();
        setCountries(list);
      } catch (err) {
        console.error("Could not load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!countryCode) {
        setStates([]);
        return;
      }
      const countryObj = countries.find((c) => c.code === countryCode);
      if (!countryObj) return;

      setStatesLoading(true);
      try {
        const list = await fetchStates(countryObj.name);
        setStates(list);
      } catch (err) {
        console.error("Could not load states", err);
        setStates([]);
      } finally {
        setStatesLoading(false);
      }
    })();
  }, [countryCode, countries]);

  const countryCurrencies =
    countries.find((c) => c.code === countryCode)?.currencies ?? [];

  return {
    countries,
    states,
    countryCurrencies,
    countryCode,
    setCountryCode,
    countriesLoading,
    statesLoading,
  };
}
