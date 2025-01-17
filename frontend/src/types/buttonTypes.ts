import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    onClick: () => void;
    light?: boolean;
    className?: string;
  }

