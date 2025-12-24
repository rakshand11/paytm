type subHeadingProps = {
  label: string;
};

export function SubHeading({ label }: subHeadingProps) {
  return <div>{label}</div>;
}
