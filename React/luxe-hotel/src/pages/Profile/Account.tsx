import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import { useState } from "react";
import { updateUserProfile } from "../../store/slices/authSlice";

export default function Account() {
  // const avatar = 'https://firebasestorage.googleapis.com/v0/b/luxe-hotel-e17c1.appspot.com/o/avatar.png?alt=media&token=2a794132-cb42-402a-9813-483c58a184e6'
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  // Update user profile
  const dispatch = useDispatch();
  const handleUpdateProfile = () => {
    const updatedUser = {
      displayName: name,
      phoneNumber: phone,
      photoURL: photo,
    };
    // Update user profile with updatedUser data
    dispatch(updateUserProfile(user.uid, updatedUser));
  };

  

  return (
    <div className="container-fluid" id="account">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="text-center">
          <img
            src={user.photoUrl || avatar}
            alt="Profile"
            width="200rem"
            height="200rem"
            className="rounded-circle"
            aria-label="User profile"
          />
          <div className="my-auto">
            <h2 className="my-2">{user.displayName}</h2>
            <p className="my-2">Email: {user.email}</p>
            <p className="my-2 mb-4">
              Phone: {user.phoneNumber || "Add a number"}
            </p>
          </div>
          <button
            className="btn btn-primary rounded-pill px-3"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* update modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Profile
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-center">
                <img
                  src={user.photoUrl || avatar}
                  alt="Profile"
                  width="100"
                  height="100"
                  className="rounded-circle"
                  aria-label="User profile"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jon Doe"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081 234 5678"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Photo URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="Jon Doe"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-primary"
                onClick={() => handleUpdateProfile()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
