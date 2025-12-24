type Moneyvalue = {
  value: string;
};

export const Balance = ({ value }: Moneyvalue) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};
