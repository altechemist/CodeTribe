import { useSelector } from "react-redux";

export default function Account() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container-fluid" id="account">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="text-center">
          <img
            src="https://github.com/mdo.png"
            alt="Profile"
            width="200rem"
            height="200rem"
            className="rounded-circle"
            aria-label="User profile"
          />
          <div className="my-auto">
            <h2 className="my-2">{user.displayName}</h2>
            <p className="my-2">Email: {user.email}</p>
            <p className="my-2 mb-4">Phone: {user.phoneNumber}</p>
          </div>
          <button  className="btn btn-primary rounded-pill px-3">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
