import { CountryCode } from "libphonenumber-js";

export interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export interface CountryCodesDropdownProps {
  onSelect: (dialCode: string, code: CountryCode) => void;
  onClose: () => void;
}

export interface SocialButtonProps {
  type: string;
}