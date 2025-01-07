import { useEffect, useState } from "react";
import fetchCountryCodes from '../../apis/numbers/numbers';
import { CountryCodes } from "../../apis/types";


const CountryCodesDropdown = () => {
    const [countryCodes, setCountryCodes] = useState<CountryCodes[]>([]);

    const getCountryCodes = async () => {
        try {
            const response = await fetchCountryCodes();
            setCountryCodes(response);
            console.log(response);
        } catch (error) {
            console.error('Error fetching country codes:', error);
        }
    };

    useEffect(() => {
        getCountryCodes();
    }, []);

    return (
        <ul>
          {countryCodes.map((country) => (
            <li
              key={country.code}
              className="px-3 py-1 cursor-pointer hover:bg-gray-100 text-sm text-[#6E6E6E]"
              value={country.dial_code}
            >
                <div className="flex justify-between">
                <span>
              {country.name} ({country.dial_code})
                </span>
                <span>({country.code}) </span>
                </div>
              
            </li>
          ))}
        </ul>
      
    );
};

export default CountryCodesDropdown;