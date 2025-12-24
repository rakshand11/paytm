type Inputprops = {
  label: string;
  placeholder: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputBox({ label, placeholder, onchange }: Inputprops) {
  return (
    <div>
      <div>{label}</div>
      <input onChange={onchange} placeholder={placeholder} />
    </div>
  );
}
