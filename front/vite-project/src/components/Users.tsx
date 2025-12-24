import { useEffect, useState } from "react";
import { Button } from "./Button";

import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./axios";

type UserType = {
  firstName: string;
  lastName: string;
  _id?: string;
};

type userProps = {
  user: UserType;
};

export const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    axiosInstance
      .get(`/user/bulk?filter=` + filter, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users || []); // Fixed: users (plural) instead of user
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]); // Set empty array on error
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id || user.firstName} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }: userProps) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
