import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import { ModalProps } from '../../types/navbarProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import CountryCodesDropdown from './CountryCodesDropdown';
ReactModal.setAppElement('#root');

const LoginModal = ({ isOpen, closeModal }: ModalProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log(isDropdownOpen);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const validatePhoneNumber = (value: string) => {
    if (!validator.isMobilePhone(value, 'any', { strictMode: false })) {
      return 'Invalid phone number';
    }
    return true;
  };

  const customStyles = {
    overlay: {
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'white',
      padding: 0,
      overflow: 'hidden',
      minWidth: '370px',
      borderRadius: '14px',
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Login Modal"
      style={customStyles}
    >
      <div className="flex max-w-[470px] flex-col items-center justify-center px-16 pt-10">
        <h2 className="text-4xl font-bold">Welcome</h2>
        <p className="mb-6 mt-4 text-[#6E6E6E]">Let's start with your phone number</p>
        <div className="mb-4 flex gap-3">
          <div className="flex w-[120px] relative items-center justify-between rounded-xl border px-4" onClick={handleDropdownOpen}>
            <input
              {...register('countryCode', { required: 'Country code is required' })}
              placeholder="+995"
              className="w-1/2"
            />
            {/* {errors.countryCode && <p className="text-red-500">{errors.countryCode.message}</p>} */}
            <span>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
            {isDropdownOpen && <div className="h-[200px] w-[250px] rounded-lg absolute top-[60px] left-0  z-50 bg-white overflow-y-auto border" >
              <CountryCodesDropdown />
            </div>}
            
          </div>

          <div className="relative">
            <input
              {...register('phone', {
                required: 'Phone number is required',
                validate: validatePhoneNumber,
              })}
              id="phone"
              placeholder=" "
              className="peer rounded-xl border px-5 pb-3 pt-6 text-sm"
            />
            {/* {errors.phone && <p className="text-red-500">{errors.phone.message}</p>} */}
            <label
              htmlFor="phone"
              className="absolute left-5 top-1/2 -translate-y-1/2 transform cursor-text text-gray-500 transition-all duration-[400ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black"
            >
              Phone Number
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="pt max-w-[470px]">
          {/* First Name */}
          <div className="mb-4">
            <input
              {...register('firstName', { required: 'First name is required' })}
              placeholder="First Name"
              className="w-full border p-2"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-4 z-0">
            <input
              {...register('lastName', { required: 'Last name is required' })}
              placeholder="Last Name"
              className="w-full border p-2"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              {...register('email', {
                required: 'Email is required',
                validate: (value) => validator.isEmail(value) || 'Invalid email address',
              })}
              placeholder="Email"
              className="w-full border p-2"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          {/* <div className="mb-4">
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder="Password"
              className="w-full border p-2"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div> */}

          {/* Submit Button */}
          {/* <div>
            <input type="submit" value="Login" className="rounded bg-blue-500 p-2 text-white" />
          </div> */}
          <button onClick={closeModal} className="mt-4 text-sm text-gray-500 hover:text-gray-700">
            Close
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default LoginModal;
