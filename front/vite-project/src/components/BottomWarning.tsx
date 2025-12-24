import { Link } from "react-router-dom";

type Bottomprops = {
  label: string;
  buttonText: string;
  to: string;
};

export function BottomWarning({ label, buttonText, to }: Bottomprops) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
