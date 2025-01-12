import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { useState } from 'react';
import { CountryCode, isPossiblePhoneNumber } from 'libphonenumber-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryCodesDropdown from './CountryCodesDropdown';
import SMSCodeInputs from './SMSCodeInputs';
import { toast } from 'react-toastify';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface FormInputs {
  phone: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountryCodeNum, setSelectedCountryCodeNum] = useState<string>('+995');
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>('GE');
  const [formData, setFormData] = useState<FormInputs>({
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountryCodeSelect = (codeNum: string, code: CountryCode) => {
    setSelectedCountryCodeNum(codeNum);
    setSelectedCountryCode(code);
    setIsDropdownOpen(false);
  };

  const onSubmit = async (data: FormInputs) => {
    console.log(data);
  };

  const handleCodeComplete = (code: string) => {
    if (code === '1234') {
      toast('Code is correct! Enter your password');
      setTimeout(() => {
        setShowCodeInput(false);
      }, 2000);
    } else {
      toast('Code is incorrect');
    }
  };

  const validatePhoneNumber = () => {
    const countryCode: CountryCode = selectedCountryCode as CountryCode;
    const isPossible = isPossiblePhoneNumber(formData.phone, countryCode);

    if (!isPossible) {
      return 'Invalid phone number';
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[470px]">
      <div className="mb-2 flex w-full gap-2">
        <div
          className="relative flex w-[200px] cursor-pointer items-center rounded-xl border px-4"
          onClick={handleDropdownOpen}
        >
          <input
            value={selectedCountryCodeNum}
            placeholder={selectedCountryCodeNum}
            className="w-1/2 cursor-pointer outline-none placeholder:text-[#4e4e4e] focus:border-transparent focus:ring-0"
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
              <CountryCodesDropdown onSelect={handleCountryCodeSelect} />
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
            name="phone"
            value={formData.phone}
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
            onChange={(e) => {
              handleInputChange(e);
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />

          <label
            htmlFor="phone"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${formData.phone != '' ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Phone Number
          </label>
          {errors.phone && (
            <p className="absolute left-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <input
            {...register('username', {
              required: 'Username is required',
            })}
            value={formData.username}
            onChange={handleInputChange}
            id="username"
            name="username"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
          />
          <label
            htmlFor="username"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${formData.username != '' ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Username
          </label>
          {errors.username && (
            <p className="absolute left-1 text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="relative w-full">
          <input
            {...register('password', {
              required: 'Password is required',
            })}
            value={formData.password}
            onChange={handleInputChange}
            id="password"
            name="password"
            type="password"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
          />
          <label
            htmlFor="password"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${formData.password != '' ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Password
          </label>
          {errors.password && (
            <p className="absolute left-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="relative w-full">
          <input
            {...register('confirmPassword', {
              required: 'Password confirmation is required',
            })}
            value={formData.password}
            onChange={handleInputChange}
            id="confirmPassword"
            name="confirmPassword"
            type="confirmPassword"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
          />
          <label
            htmlFor="confirmPassword"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${formData.confirmPassword != '' ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Confirm Password
          </label>
          {errors.confirmPassword && (
            <p className="absolute left-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      {showCodeInput && <SMSCodeInputs onComplete={handleCodeComplete} />}
      {/* Submit Button */}
      <div>
        <input
          type="submit"
          value="Register"
          className="mt-4 w-full cursor-pointer rounded-3xl bg-c-green py-3 text-white"
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
