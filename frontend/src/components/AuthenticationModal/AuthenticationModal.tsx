import ReactModal from 'react-modal';

import { ModalProps } from '../../types/navbarProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import SocialButton from './SocialButton';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

ReactModal.setAppElement('#root');

const AuthenticationModal = ({ isOpen, closeModal }: ModalProps) => {
  const [formType, setFormType] = useState<'login' | 'register'>('login');

  const handleTypeChange = () => {
    if (formType === 'login') {
      setFormType('register');
    } else {
      setFormType('login');
    }
  };

  const handleAfterOpen = () => {
    document.body.classList.add('overflow-hidden');
  };
  const handleAfterClose = () => {
    document.body.classList.remove('overflow-hidden');
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
    borderRadius: '14px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
} as const;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Login Modal"
      style={customStyles}
      preventScroll={false}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
    >
      <div className="maw-sm:h-screen relative flex flex-col items-center justify-center px-6 py-10 max-sm:w-screen sm:min-w-[400px] sm:max-w-[500px] lg:px-16">
        <h2 className="text-[40px] font-bold">Welcome</h2>
        <p className="mb-6 mt-4 text-[#6E6E6E]">Let's start with your phone number</p>

        {formType === 'login' ? <LoginForm /> : <RegistrationForm />}

        <div className="mb-4 flex w-full flex-col gap-2">
          <p className="mt-3 text-sm">
            {formType === 'login' ? "Don't" : "Already"} have an accout?{' '}
            <span onClick={handleTypeChange} className="cursor-pointer underline">
            {formType === 'login' ? "Register" : "Login"} Here
            </span>
          </p>

          <div className="my-8 border-b text-center text-xs leading-[0.1em]">
            <span className="bg-white px-8 text-[#6E6E6E]">or with</span>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-4">
            <SocialButton type="google" />
            <SocialButton type="email" />
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="absolute right-6 top-2 mt-4 flex size-6 items-center justify-center rounded-[50%] bg-[#919191] text-sm text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} className="text-white" />
          </button>

          <p className="mt-8 text-center text-xs text-[#6E6E6E]">
            By creating an account, you automatically accept our Terms of service, Privacy Policy
            and Cookies Policy
          </p>
        </div>
      </div>
    </ReactModal>
  );
};

export default AuthenticationModal;
