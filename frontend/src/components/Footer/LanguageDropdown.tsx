import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { filterSeleceted } from '../../utils';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../locales';
import { SupportedLanguage } from '../../locales/types';
import { motion } from "motion/react"

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {i18n} = useTranslation('global');

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language.name);
    i18n.changeLanguage(language.code);
    localStorage.setItem('language', language.code);
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const savedLanguageCode = localStorage.getItem('language') || 'en';
    const savedLanguage = supportedLanguages.find(
      (lang) => lang.code === savedLanguageCode
    );
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage.name);
      i18n.changeLanguage(savedLanguageCode);
    }
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        className="flex w-full items-center justify-between rounded-md bg-[#292929] px-4 py-3 text-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-xs">{selectedLanguage}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}>
          <FontAwesomeIcon icon={faChevronDown} />
        </motion.span>
      </button>
      {isOpen && (
        <ul className="absolute bottom-12 right-0 w-full mb-1 rounded-md rounded-b-none text-xs shadow-lg ">
        {filterSeleceted(
          supportedLanguages.map((lang) => lang.name),
          selectedLanguage
        ).map((name) => {
          const lang = supportedLanguages.find((l) => l.name === name);
          return (
            <li
              key={lang?.code}
              className="rounded-md bg-[#292929] cursor-pointer px-4 py-3 hover:bg-[#444444] active:bg-[#323232]"
              onClick={() => handleLanguageChange(lang!)}
            >
              {lang?.name}
            </li>
          );
        })}
      </ul>
      )}
    </div>
  );
};
export default LanguageDropdown;
