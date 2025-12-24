import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign Up"></Heading>
          <SubHeading
            label={"Fill the following information to create an account"}
          ></SubHeading>
          <InputBox
            onchange={(e) => {
              setFirstName(e.target.value);
            }}
            label="First Name"
            placeholder="Rakshand"
          ></InputBox>
          <InputBox
            onchange={(e) => {
              setLastName(e.target.value);
            }}
            label="Last Name"
            placeholder="Chhikara"
          ></InputBox>
          <InputBox
            onchange={(e) => {
              setEmail(e.target.value);
            }}
            label="E-mail"
            placeholder="rakshand@gmail.com"
          ></InputBox>
          <InputBox
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="Rakshand@1234"
          ></InputBox>
          <div className="pt-4">
            <Button
              label="Sign up"
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/user/signup",
                  {
                    firstName,
                    lastName,
                    email,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            ></Button>
          </div>
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};
