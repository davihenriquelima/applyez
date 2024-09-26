    import { createContext, ReactNode, useContext, useEffect, useState } from "react";

    type Country = {
        code: string;
        name: string;
        areCode:string;
        phoneRegex:string;
        phoneFormat:string;
        states: State[];
    };
    
    type State = {
        code: string;
        name: string;
        cities: City[];
    };

    type City = {
        name: string;
    };

    type CountriesContextType = {
        countries: Country[];
        states: State[];
        cities: City[];
        selectedCountry: string | null;
        setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>;
        selectedState: string | null;
        setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
        setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
        setStates: React.Dispatch<React.SetStateAction<State[]>>;
        setCities: React.Dispatch<React.SetStateAction<City[]>>;
        handleCountryChange: (event:React.ChangeEvent<HTMLSelectElement>) => void;
        handleStateChange: (event:React.ChangeEvent<HTMLSelectElement>) => void;
        phoneRegex:string | null;
        setPhoneRegex: React.Dispatch<React.SetStateAction<string | null>>;
        phoneFormat:string | null;
        setPhoneFormat: React.Dispatch<React.SetStateAction<string | null>>;
    };

    export const CountriesContext = createContext<CountriesContextType | null >(null);

    export const CountriesProvider = ({children}: {children:ReactNode})=> {
        const [countries, setCountries] = useState<Country[]>([]);
        const [states, setStates] = useState<State[]>([]);
        const [cities, setCities] = useState<City[]>([]);
        const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
        const [selectedState, setSelectedState] = useState<string | null>(null);
        const [phoneRegex, setPhoneRegex] = useState<string | null>(null);
        const [phoneFormat, setPhoneFormat] = useState<string | null>(null);

        useEffect(() => {
            const loadData = async () => {
                const response = await fetch('/data/countries.json');
                const data = await response.json();
                setCountries(data);
            };
            loadData();
        },[])

        const handleCountryChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
            const countryCode = event.target.value;
            setSelectedCountry(countryCode);
            const country = countries.find((c)=> c.code === countryCode);
            setStates([]);
            setStates(country?.states || []);
            setCities([]);
            setPhoneFormat(country?.phoneFormat || null)
            setPhoneRegex(country?.phoneRegex || null)
        }
    
        const handleStateChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
            const stateCode = event.target.value;
            setSelectedState(stateCode);
            const state = states.find((s)=> s.code === stateCode);
            setCities([]);
            setCities(state?.cities || []);
        }

        return (
            <CountriesContext.Provider 
                value={{countries, states, cities, selectedCountry, setSelectedCountry, selectedState, setSelectedState, setCountries, setStates, setCities, handleCountryChange, handleStateChange, phoneFormat, setPhoneFormat, phoneRegex, setPhoneRegex}}
            >
                {children}
            </CountriesContext.Provider>
        )
    }

    export const useCountriesCtx = () => {
        const context = useContext(CountriesContext);
        if (!context) {
            throw new Error('useListCtx must be used within a CountriesProvider');
        }
        return context;
    };