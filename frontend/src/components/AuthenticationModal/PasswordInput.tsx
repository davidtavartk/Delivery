import { useState } from 'react';

interface PasswordInputProps {
  onComplete?: (password: string) => void;
}

const PasswordInput = ({ onComplete }: PasswordInputProps) => {
  const [password, setPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    if (onComplete) {
      onComplete(password);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full rounded-xl border px-5 py-3 outline-none"
      />
    </div>
  );
};

export default PasswordInput;
