import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import Button from '../Button/Button';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import AuthenticationModal from '../AuthenticationModal/AuthenticationModal';


const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <nav className="flex h-20 items-center justify-between bg-c-yel px-4 sm:px-6 lg:px-24">
        <div className="cursor-pointer">
          <img className="h-[70%] max-w-[80px]" src={logo} alt="logo" />
        </div>
        <div>
          <Button onClick={handleClick}>
            <FontAwesomeIcon icon={faUser} className="hidden lg:block" />
            <span>Login</span>
          </Button>
        </div>
      </nav>
      <AuthenticationModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
};

export default Navbar;
