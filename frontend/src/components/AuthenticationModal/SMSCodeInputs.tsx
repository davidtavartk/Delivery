import { useRef, useState } from 'react';

interface SMSCodeInputsProps {
  onComplete: (code: string) => void; // Callback when all 4 digits are entered
}

const SMSCodeInputs = ({ onComplete } : SMSCodeInputsProps) => {
  const [smsCode, setSmsCode] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleSmsCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const updatedCode = [...smsCode];
      updatedCode[index] = value;
      setSmsCode(updatedCode);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (updatedCode.every((digit) => digit !== '')) {
        onComplete(updatedCode.join(''));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      if (smsCode[index] === '' && index > 0) {
        const updatedCode = [...smsCode];
        updatedCode[index - 1] = '';
        setSmsCode(updatedCode);
        inputRefs.current[index - 1]?.focus();
      } else {
        const updatedCode = [...smsCode];
        updatedCode[index] = '';
        setSmsCode(updatedCode);
      }
    }
  };
  
  

  return (
    <div className="mt-4 flex gap-2 justify-around w-3/5 m-auto">
      {smsCode.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="h-12 w-12 rounded border text-center focus:outline-dashed"
          value={digit}
          onChange={(e) => handleSmsCodeChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default SMSCodeInputs;
