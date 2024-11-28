import React, { useState } from "react";
import Swal from "sweetalert2";

interface AuthFormProps {
  setUser: (user: {
    name: string;
    email: string;
    password: string;
    preferences: string[];
    bookmarks: string[];
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interest, setInterest] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // To toggle between Sign Up and Login

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear any previous error
    setError("");
    setSuccess(true);

    if (isSignUp) {
      // Save to local storage
      localStorage.setItem(
        "news_app",
        JSON.stringify({
          name,
          email,
          password,
          preferences: [],
          bookmarks: [],
        })
      );
      setUser({ name, email, password, preferences: [interest], bookmarks: [] });
      Swal.fire("Success!", "You are now signed up.", "success");
    } else {
      // Check if the user is registered
      const savedUser = localStorage.getItem("news_app");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email && user.password === password) {
          setUser(user);
          Swal.fire("Success!", "You are now logged in.", "success");
        } else {
          setError("Invalid email or password.");
        }
      } else {
        setError("Invalid email or password.");
      }
    }

    // Reset the form fields
    setName("");
    setEmail("");
    setPassword("");
    setInterest("");
    setConfirmPassword("");

    // Optionally clear the success message after a few seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000); // Hide success message after 3 seconds
  };

  return (
    <div className="container-sm col-sm-6 ">
      {success && (
        <p className="text-success">
          {isSignUp ? "You are now signed up." : "You are now logged in."}
        </p>
      )}
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <h2 className="text-center">{isSignUp ? "Sign Up" : "Login"}</h2>

        {isSignUp && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isSignUp && (
          <>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Preferences
              </label>
              <input
                type="text"
                id="confirmPassword"
                className="form-control"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Login"
            : "Need an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
