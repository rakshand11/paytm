import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <div>
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email"
            placeholder="rakshand@gmail.com"
          />
          <InputBox
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder=""
          />
        </div>
        <div className="pt-4">
          <Button label="Sign In" onClick={async () => {}} />
        </div>
        <BottomWarning
          label="Dont have an account"
          buttonText="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
};
