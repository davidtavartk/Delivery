import { RestaurantProps } from '../../types/restaurantTypes';
import { noSpaces } from '../../utils';

const RestaurantItem = ({ name, image }: RestaurantProps) => {
  return (
    <div className="relative size-[84px] sm:size-[92px] md:size-[124px]">
      <img
        className="rounded-full border border-yellow-500 shadow-custom-shadow"
        src={image}
        alt={`${name} restaurant`}
      />
      <div>
        <span className="color-black absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform rounded-lg bg-white px-2 py-1 text-xs font-bold border sm:border-none sm:bg-c-yel">
          {noSpaces(name)}
        </span>
      </div>
    </div>
  );
};
export default RestaurantItem;
