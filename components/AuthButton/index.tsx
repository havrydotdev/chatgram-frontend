import { AuthButtonProps } from "./AuthButton.props";

export const AuthButton = ({
  className,
  text,
  ...props
}: AuthButtonProps): React.JSX.Element => {
  return (
    <button
      className={`${className} block h-[50px] bg-iceberg-blue w-[130px] rounded-xl text-[#fff]`}
      {...props}
    >
      {text}
    </button>
  );
};
