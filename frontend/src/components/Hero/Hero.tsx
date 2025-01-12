import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddressInput from '../AddressInput/AddressInput';
import Button from '../Button/Button';
import HeroPhotoCarousel from './HeroPhotoCarousel';
import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import wave from '../../assets/waves/wavesNegative.svg';

const Hero = () => {
  const { t } = useTranslation('global');

  const handleClick = () => {
    return;
  };
  return (
    <div className="relative bg-c-yel lg:pt-10 pt-6">
      <div className="m-auto flex flex-col justify-between gap-0 px-4 lg:flex-row sm:gap-8 lg:pb-11">
        <div className="m-auto">
          <HeroPhotoCarousel />
        </div>
        <div className="flex flex-col justify-between gap-6 text-center sm:pb-8 lg:w-4/6 lg:text-start">
          <h1 className="text-[40px] font-bold lg:text-6xl mt-10 leading-tight">{t('hero.title1')}</h1>
          <h2 className="hidden font-bold sm:block">{t('hero.title2')}</h2>
          <div className="lg:mr-auto">
            <AddressInput />
          </div>
          <div className="m-auto sm:hidden">
            <Button onClick={handleClick} light>
              <FontAwesomeIcon icon={faThumbTack} />
              <span>{t('hero.location')}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute w-full rotate-180 hidden sm:block">
        <img src={wave} alt="wave" className="h-12 w-full" />
      </div>
    </div>
  );
};

export default Hero;
