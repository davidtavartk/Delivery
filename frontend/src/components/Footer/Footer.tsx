import logo from '../../assets/logo.png';
import appStore from '../../assets/svg/AppStore.svg';
import googlePlay from '../../assets/svg/GooglePlay.svg';
import LanguageDropdown from './LanguageDropdown';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const {t} = useTranslation("global");

  return (
    <footer className="bg-[#1D1D1D] px-8 pb-16 pt-8 text-[#E4E4E4] w-full ">
      <div className="">
        <img className="mb-4 h-[80px] w-[160px]" src={logo} alt="logo" />
      </div>
      <div className="container mb-10 flex flex-col sm:m-auto gap-4 sm:gap-1 sm:flex-row sm:justify-between sm:text-center">
        <div className="flex flex-col gap-4 break-words">
          <span className="text-xl font-bold text-white">{t('footer.letDoItTogether')}</span>
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.careers')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.partners')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.couriers')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.business')}</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 break-words">
          <span className="text-xl font-bold text-white">{t('footer.linksOfInterest')}</span>
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.aboutUs')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.faq')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.prime')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.blog')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.contactUs')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.security')}</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 break-words">
          <span className="text-xl font-bold text-white">{t('footer.followUs')}</span>
          <ul className="flex flex-col gap-4">
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="" className='text-[#e4e4e4d5]'>{t('footer.facebook')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.twitter')}</a>
            </li>
            <li className="cursor-pointer text-[#e4e4e4d5]">
              <a href="">{t('footer.instagram')}</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-8 break-words">
          <div className="flex justify-around sm:flex-col items-center">
            <img src={appStore} alt="appStore" className='max-w-[140px] max-h-[60px]'/>
            <img src={googlePlay} alt="googlePlay" className='max-w-[140px] max-h-[60px]'/>
          </div>

          <div className="flex flex-col gap-6 text-xs">
            <a className="uppercase text-[#e4e4e4d5]" href="#">
            {t('footer.termsAndConditions')}
            </a>
            <a className="uppercase text-[#e4e4e4d5]" href="#">
            {t('footer.privacyPolicy')}
            </a>
            <a className="uppercase text-[#e4e4e4d5]" href="#">
            {t('footer.cookiesPolicy')}
            </a>
            <a className="uppercase text-[#e4e4e4d5]" href="#">
              {t('footer.compliance')}
            </a>
          </div>
        </div>
      </div>
      <div className="m-auto w-48 sm:m-0 sm:mr-auto">
        <LanguageDropdown/>
      </div>
    </footer>
  );
};
export default Footer;
