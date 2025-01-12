import { europeanCountries } from './constants';
import countriesOpt from '../../assets/svg/iconComponents/countriesOpt.svg';
import { useTranslation } from 'react-i18next';
import wave from '../../assets/waves/wavesOpacity.svg';

const Locations = () => {
  const { t } = useTranslation('global');
  return (
    <div className="relative bg-c-yel px-4 py-12 sm:px-6 lg:px-24 mt-32 pb-28">
      <div className="absolute w-full top-[-68px] left-0 rotate-180">
        <img src={wave} alt="wave" className="w-full h-20" />
      </div>
      <div className="container m-auto">
        <div className="flex flex-col items-center justify-center">
          <img src={countriesOpt} alt="countriesGlobus" className="h-[140px] w-[140px]" />
          <h2 className="my-8 text-center text-4xl font-bold">{t('locations.title')}</h2>
        </div>

        <ul className="mt-4 flex flex-wrap justify-center gap-3 sm:px-6">
          {europeanCountries.map((country) => (
            <li
              key={country}
              className="flex items-center justify-center rounded-3xl bg-[#FFF3DA] px-6 py-2 shadow-md sm:px-8 sm:py-3"
            >
              <span className="text-xl font-medium">{country}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Locations;
