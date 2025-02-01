import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import CountryCodesDropdown from './CountryCodesDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { isPossiblePhoneNumber, CountryCode } from 'libphonenumber-js';
import SMSCodeInputs from './SMSCodeInputs';
import PasswordInput from './PasswordInput';
import { checkUserExists, loginUser } from '../../apis/users/users';
import { toast } from 'react-toastify';

interface FormInputs {
  phone: string;
  password: string;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
      } = useForm<FormInputs>();
      
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountryCodeNum, setSelectedCountryCodeNum] = useState<string>('+995');
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>('GE');
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [submitText, setSubmitText] = useState<string>('Get sms code');
  const [password, setPassword] = useState<string>('')

  const handleDropdownOpen = () => {
    if (!isLocked) {
        setIsDropdownOpen(!isDropdownOpen);
      }
  };

  const handleCountryCodeSelect = (codeNum: string, code: CountryCode) => {
    if (!isLocked) {
        setSelectedCountryCodeNum(codeNum);
        setSelectedCountryCode(code);
        setIsDropdownOpen(false);
      }
  };

  const handleCodeComplete = (code: string) => {
    if (code === '1234') {
      toast('Code is correct! Enter your password');
      setIsLocked(true);
      setTimeout(() => {
        setShowPasswordInput(true);
        setShowCodeInput(false);
        setSubmitText("Login")
      }, 2000);
    } else {
      toast('Code is incorrect');
      setShowPasswordInput(false);
    }
  };
  
  const validatePhoneNumber = () => {
    const countryCode: CountryCode = selectedCountryCode as CountryCode;
    const isPossible = isPossiblePhoneNumber(watch('phone'), countryCode);

    if (!isPossible) {
      return 'Invalid phone number';
    }
    return true;
  };

  const onSubmit = async (data: FormInputs) => {
    const fullPhoneNumber = `${selectedCountryCodeNum} ${data.phone}`;

    if (showPasswordInput) {
        try {
          const response = await loginUser(fullPhoneNumber, password);
          toast(response.message);
        } catch (error) {
          console.error('Error logging in:', error);
          toast("Invalid Password");
        }
      } else {
        try {
          const response = await checkUserExists(fullPhoneNumber);
          if (response.exists) {
            toast('SMS code: 1234');
            setShowCodeInput(true);
          } else {
            toast('User does not exist. Please sign up');
            setShowCodeInput(false);
          }
        } catch (error) {
          console.error('Error checking user existence:', error);
          toast('Error occurred. Please try again later');
        }
      }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[470px]">
      <div className="mb-4 flex w-full gap-2">
        <div
          className={`relative flex w-[200px] items-center rounded-xl border px-4 ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          onClick={handleDropdownOpen}
        >
          <input
            value={selectedCountryCodeNum}
            placeholder={selectedCountryCodeNum}
            className={`w-1/2 cursor-pointer outline-none placeholder:text-[#4e4e4e] focus:border-transparent focus:ring-0 ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
            readOnly
          />
          <motion.span
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="absolute right-4"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.span>
          {isDropdownOpen && (
            <div className="absolute left-0 top-[60px] z-50 h-[200px] w-[250px] overflow-y-auto rounded-lg border bg-white">
              <CountryCodesDropdown onSelect={handleCountryCodeSelect} onClose={() => setIsDropdownOpen(false)}/>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <input
            {...register('phone', {
              required: 'Phone number is required',
              validate: validatePhoneNumber,
              pattern: {
                value: /^(0|[1-9]\d*)$/,
                message: 'Invalid phone number',
              },
            })}
            id="phone"
            placeholder=" "
            className={`peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
            onChange={(e) => {
                setValue('phone', e.target.value.replace(/[^0-9]/g, ''));
              }}
            readOnly={isLocked}
          />

          <label
            htmlFor="phone"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${watch('phone') ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Phone Number
          </label>
          {errors.phone && (
            <p className="absolute left-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>
      {showCodeInput && <SMSCodeInputs onComplete={handleCodeComplete} isLocked={isLocked}/>}
      {showPasswordInput && <PasswordInput onComplete={(value) => setPassword(value)}/>}

      <div>
        <input
          type="submit"
          value={submitText}
          className="mt-4 w-full cursor-pointer rounded-3xl bg-c-green py-3 text-white"
        />
      </div>
    </form>
  );
};

export default LoginForm;
