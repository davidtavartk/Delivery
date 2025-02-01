import { useEffect, useRef, useState } from 'react';
import fetchCountryCodes from '../../apis/numbers/numbers';
import { CountryCodes } from '../../apis/types';
import { CountryCodesDropdownProps } from '../../types/navbarProps';
import { CountryCode } from 'libphonenumber-js';

const CountryCodesDropdown = ({ onSelect, onClose }: CountryCodesDropdownProps) => {
  const [countryCodes, setCountryCodes] = useState<CountryCodes[]>([]);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const getCountryCodes = async () => {
    try {
      const response = await fetchCountryCodes();
      setCountryCodes(response);
      // console.log(response);
    } catch (error) {
      console.error('Error fetching country codes:', error);
    }
  };

  useEffect(() => {
    getCountryCodes();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose(); // Notify parent to close the dropdown
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <ul ref={dropdownRef}>
      {countryCodes.map((country) => (
        <li
          key={country.code}
          className="cursor-pointer px-3 py-1 text-sm text-[#6E6E6E] hover:bg-gray-100"
          value={country.dial_code}
          onClick={() => onSelect(country.dial_code, country.code as CountryCode)}
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
