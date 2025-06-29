import axios from "axios";

export interface Country {
  name: string;
  code: string;
  currencies: string[];
}

export const fetchCountries = async (): Promise<Country[]> => {
  const { data } = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,cca2,currencies"
  );

  return data
    .map((c: any) => ({
      name: c.name.common,
      code: c.cca2,
      currencies: Object.keys(c.currencies ?? {}),
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
};

export const fetchStates = async (countryName: string): Promise<string[]> => {
  const { data } = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/states",
    { country: countryName }
  );
  return data.data.states.map((s: any) => s.name);
};
