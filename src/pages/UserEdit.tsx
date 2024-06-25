import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, editUser, fetchUser } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

function UserEdit() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const result = userData.id
      ? await dispatch(editUser(userData))
      : await dispatch(createUser(userData));

    if (result.success) {
      alert("User saved successfully.");
      navigator('/')
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 w-full rounded border p-2"
      />
      <input
        type="text"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="mb-4 w-full rounded border p-2"
      />
       
      <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
        Save
      </button>
    </div>
  );
}

export default UserEdit;
