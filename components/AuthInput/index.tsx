import { AuthInputProps } from "./AuthInput.props";
import styles from "./AuthInput.module.css";

export const AuthInput = ({
  placeholder,
  type = "text",
  className = "",
  onChange,
  name = placeholder.toLowerCase(),
  value,
}: AuthInputProps): React.JSX.Element => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange ?? undefined}
      value={value}
      className={`pointer-events-auto rounded-xl w-[100%] h-[56px] px-4 py-2 focus:outline-none border-[1.5px]
       border-navy-grey border-opacity-[0.5] border-solid text-rich-black leading-5 text-[20px] font-medium ${className} ${styles["auth-input"]}`}
    />
  );
};
