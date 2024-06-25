import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types"; // Adjust the path as needed
import { fetchUsers, deleteUser } from "../reducers/userSlice";


function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        {" "}
        <h3 className="mb-4 text-lg font-semibold">User List</h3>
        <Link to={`/create`}>
          <button className="rounded bg-green-500 px-3 py-1 text-white">
            Create User
          </button>
        </Link>
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between border-b py-2"
        >
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
          </div>
          <div>
            <button
              className="mr-2 rounded bg-red-500 px-3 py-1 text-white"
              onClick={() => dispatch(deleteUser(user.id))}
            >
              Delete
            </button>
            <Link to={`/edit/${user.id}`}>
              <button className="rounded bg-blue-500 px-3 py-1 text-white">
                Edit
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
