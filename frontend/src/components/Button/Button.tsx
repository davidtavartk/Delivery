import { ButtonProps } from "../../types/buttonTypes";

const Button = ({ onClick, light, className, children }: ButtonProps) => {
  return (
    <div>
      <button
        className={`flex h-11 items-center justify-center gap-2 rounded-3xl px-6 text-sm font-bold hover:bg-c-green-h active:bg-c-green-f hover:text-c-light-green ${light ? 'bg-c-light-green text-[#017963]' : 'bg-c-green text-white'} ${className}`}
        onClick={onClick}
      >
        <span className="flex items-center justify-center gap-2 font-bold">{children}</span>
      </button>
    </div>
  );
};

export default Button;
