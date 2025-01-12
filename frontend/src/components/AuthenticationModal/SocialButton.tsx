import { capitalizeFirstLetter } from '../../utils';
import google from "../../assets/svg/google.svg";
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { SocialButtonProps } from '../../types/navbarProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SocialButton = ({type}: SocialButtonProps) => {

    const getLogo = (type: string) => {
        switch (type) {
            case 'google':
                return <img src={google} alt={type} className='absolute w-6 h-6 left-6'/>;
            case 'email':
                return <FontAwesomeIcon icon={faEnvelope} className='absolute w-6 h-6 left-6'/>;
            default:
                return null;
        }
    };

    return (
        <button className='flex items-center justify-center h-12 w-full rounded-3xl border relative hover:bg-[#F5F5F5]'>
            <span className='text-sm font-bold'>{capitalizeFirstLetter(type)}</span>
            {getLogo(type)}
        </button>
    );
};

export default SocialButton;