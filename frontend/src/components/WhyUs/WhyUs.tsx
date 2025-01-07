import { useTranslation } from 'react-i18next';
import { restaurantsOpt } from '../../assets/svg/whyUs';
import { groceriesOpt } from '../../assets/svg/whyUs';
import { deliveryOpt } from '../../assets/svg/whyUs';
import React from 'react';
import Button from '../Button/Button';

const WhyUs = () => {
  const { t } = useTranslation('global');

  const handleClick = () => {
    return;
  };

  const ExploreStoresButton = (
    <Button onClick={handleClick} className="px-10">
      Explore stores around you
    </Button>
  );

  return (
    <div className="mb-10 mt-32 text-center sm:mt-6">
      <h1 className="mb-10 pb-4 text-4xl font-bold">{t('whyUs.title')}</h1>

      <div className="flex flex-col items-center justify-between gap-10 px-4 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center">
        <div className="flex max-w-[356px] flex-col items-center text-center">
          <img src={restaurantsOpt} alt="svg" className="mb-4 h-32 w-40" />
          <h3 className="mb-2 text-xl font-bold">{t('whyUs.reasons.1.title')}</h3>
          <p>
            {t('whyUs.reasons.1.description')
              .split(t('whyUs.reasons.1.highlight'))
              .map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="rounded-lg bg-c-yel px-1">
                      {t('whyUs.reasons.1.highlight')}
                    </span>
                  )}
                </React.Fragment>
              ))}
          </p>
        </div>
        <div className="mt-0 flex items-center justify-center sm:hidden">
          {ExploreStoresButton}
        </div>
        <div className="flex max-w-[356px] flex-col items-center text-center">
          <img src={groceriesOpt} alt="svg" className="mb-4 h-32 w-40" />
          <h3 className="mb-2 text-xl font-bold">{t('whyUs.reasons.2.title')}</h3>
          <p>
            {t('whyUs.reasons.2.description')
              .split(t('whyUs.reasons.2.highlight'))
              .map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="rounded-lg bg-c-yel px-1">
                      {t('whyUs.reasons.2.highlight')}
                    </span>
                  )}
                </React.Fragment>
              ))}
          </p>
        </div>
        <div className="flex max-w-[356px] flex-col items-center text-center">
          <img src={deliveryOpt} alt="svg" className="mb-4 h-32 w-40" />
          <h3 className="mb-2 text-xl font-bold">{t('whyUs.reasons.2.title')}</h3>
          <p>
            {t('whyUs.reasons.3.description')
              .split(t('whyUs.reasons.3.highlight'))
              .map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span className="rounded-lg bg-c-yel px-1">
                      {t('whyUs.reasons.3.highlight')}
                    </span>
                  )}
                </React.Fragment>
              ))}
          </p>
        </div>
      </div>
      <div className="mt-10 hidden items-center justify-center sm:flex">{ExploreStoresButton}</div>
    </div>
  );
};
export default WhyUs;
