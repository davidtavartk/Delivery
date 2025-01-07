import { useEffect, useState } from 'react';
import { getRestaurants } from '../../apis/restaurants/restaurants';
import {Restaurant} from '../../apis/types';

import RestaurantItem from './RestaurantItem';
import Marquee from 'react-fast-marquee';
import wave from '../../assets/waves/wavesNegative.svg';
import { useTranslation } from 'react-i18next';

const TopRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation('global');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants();
        setRestaurants(response);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:py-24 text-center bg-c-yel pt-14 pb-12 sm:bg-white z-10">
      <div className='container m-auto '>
      <h1 className="text-3xl font-bold lg:text-4xl px-3 sm:bg-mark inline rounded-lg bg-mark1">{t('topRestaurants.title')}</h1>
      </div>
      <Marquee speed={8} className="h-[124px] sm:h-[132px] md:h-[150px] mt-3">
        {restaurants.slice(0, Math.ceil(restaurants.length / 2)).map((restaurant) => (
          <div className="mx-4 flex" key={restaurant.id}>
            <RestaurantItem
              name={restaurant.name}
              image={`http://localhost:3000${restaurant.image}`}
            />
          </div>
        ))}
      </Marquee>
      <Marquee speed={8} direction="right" className="h-[124px] sm:h-[132px] md:h-[150px] ">
        {restaurants.slice(Math.ceil(restaurants.length / 2)).map((restaurant) => (
          <div className="mx-4 flex" key={restaurant.id}>
            <RestaurantItem
              name={restaurant.name}
              image={`http://localhost:3000${restaurant.image}`}
            />
          </div>
        ))}
      </Marquee>
      <div className="absolute w-full rotate-180  block mt-12 sm:hidden" >
        <img src={wave} alt="wave" className="absolutek bottom-0 h-20 w-full" />
      </div>
    </div>
  );
};
export default TopRestaurants;
