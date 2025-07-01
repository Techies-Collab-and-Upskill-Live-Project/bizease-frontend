import axios from "axios";

interface CountryAPIResponse {
  name: {
    common: string;
  };
  cca2: string;
  currencies?: {
    [key: string]: {
      name: string;
      symbol?: string;
    };
  };
}

// For `fetchStates` response
interface StatesAPIResponse {
  data: {
    states: { name: string }[];
  };
}

export interface Country {
  name: string;
  code: string;
  currencies: string[];
}

export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await axios.get<CountryAPIResponse[]>(
    "https://restcountries.com/v3.1/all?fields=name,cca2,currencies"
  );

  return data
    .map((c) => ({
      name: c.name.common,
      code: c.cca2,
      currencies: Object.keys(c.currencies ?? {}),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const fetchStates = async (countryName: string): Promise<string[]> => {
  const { data } = await axios.post<StatesAPIResponse>(
    "https://countriesnow.space/api/v0.1/countries/states",
    { country: countryName }
  );

  return data.data.states.map((s) => s.name);
};
