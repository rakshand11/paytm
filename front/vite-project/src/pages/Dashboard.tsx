import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";

import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="mt-2 m-8">
        <Balance value={"10,000"} />
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};
