import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { useState } from 'react';
import { CountryCode, isPossiblePhoneNumber } from 'libphonenumber-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountryCodesDropdown from './CountryCodesDropdown';
import { toast } from 'react-toastify';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { createUser } from '../../apis/users/users';

interface FormInputs {
  phone: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
      field?: string;
    };
  };
}

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<FormInputs>();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedCountryCodeNum, setSelectedCountryCodeNum] = useState<string>('+995');
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>('GE');

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountryCodeSelect = (codeNum: string, code: CountryCode) => {
    setSelectedCountryCodeNum(codeNum);
    setSelectedCountryCode(code);
    setIsDropdownOpen(false);
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
    const payload = {
      phone: fullPhoneNumber,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    try {
      await createUser(payload);
      toast('User created successfully');
    } catch (err) {
      const error = err as ErrorResponse;

      toast.error("User registration failed");

    //   console.log('error: ', error.response.data);
      if (error.response && error.response.data.message) {
        const field = error.response.data.field;

        setError(field as 'phone' | 'username' | 'email', {
          type: 'manual',
          message: error.response.data.message,
        });
      } else {
        // console.error('Registration failed:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[470px]">
      <div className="mb-5 flex w-full gap-2">
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
              <CountryCodesDropdown
                onSelect={handleCountryCodeSelect}
                onClose={() => setIsDropdownOpen(false)}
              />
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
            //   name="phone"
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
            onChange={(e) => {
              setValue('phone', e.target.value.replace(/[^0-9]/g, ''));
            }}
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

      <div className="flex flex-col gap-5">
        <div className="relative w-full">
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-+.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email',
              },
            })}
            id="email"
            name="email"
            type="email"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
            onChange={(e) => setValue('email', e.target.value)}
          />
          <label
            htmlFor="email"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${watch('email') ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Email
          </label>
          {errors.email && (
            <p className="absolute left-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative w-full">
          <input
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[0-9A-Za-z]{5,16}$/,
                message: 'Username must be 6-16 characters. Only letters and numbers',
              },
            })}
            id="username"
            name="username"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
            onChange={(e) => setValue('username', e.target.value)}
          />
          <label
            htmlFor="username"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${watch('username') ? 'top-4 text-[10px] font-bold text-black' : ''}`}
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
              pattern: {
                value: /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/,
                message: 'Must be 8-32 characters and contain letters and numbers',
              },
            })}
            id="password"
            name="password"
            type="password"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
            onChange={(e) => setValue('password', e.target.value)}
          />
          <label
            htmlFor="password"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${watch('password') ? 'top-4 text-[10px] font-bold text-black' : ''}`}
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
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder=" "
            className="peer w-full rounded-xl border px-5 pb-3 pt-6 text-sm outline-none"
            onChange={(e) => setValue('confirmPassword', e.target.value)}
          />
          <label
            htmlFor="confirmPassword"
            className={`absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-sm text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black ${watch('confirmPassword') ? 'top-4 text-[10px] font-bold text-black' : ''}`}
          >
            Confirm Password
          </label>
          {errors.confirmPassword && (
            <p className="absolute left-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <div>
        <input
          type="submit"
          value="Register"
          className="mt-6 w-full cursor-pointer rounded-3xl bg-c-green py-3 text-white"
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
