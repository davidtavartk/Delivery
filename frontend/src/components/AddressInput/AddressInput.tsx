import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pin from '../../assets/svg/pin.svg';
import { faArrowRight, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';

const AddressInput = () => {
  const handleClick = () => {
    return;
  };
  return (
    <div className="m-auto flex h-14 gap-2 max-w-[550px] items-center justify-between rounded-lg bg-white px-4 lg:w-[550px] lg:pr-2">
      <div className="flex gap-2">
        <img src={pin} alt="Pin" />
        <span className="text-[#1C1C1C]">What's your address?</span>
      </div>
      <div>
        <span className="sm:hidden">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
        <span className="hidden sm:block ">
          <Button onClick={handleClick} light>
            <FontAwesomeIcon icon={faThumbTack} />
            <span> Use current Location</span>
          </Button>
        </span>
      </div>
    </div>
  );
};

export default AddressInput;
