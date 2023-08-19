import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface AuthButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
}
