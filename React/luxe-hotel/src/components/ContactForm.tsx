import { useState } from "react";
import Heading from "./Heading";
import Swal from "sweetalert2";
import { sendMessage } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate form data
    if (!name || !email || !message) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
        text: "Please fill out the name, email, and message fields.",
      });
      return;
    }

    try {
      dispatch(sendMessage(name, lastName, email, message));

      // Clear form fields
      setName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setName("");
      setLastName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="container mb-4 mt-4">
      <Heading title="Get In Touch" />
      <p className="text-center mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni,
        reiciendis! Quia incidunt harum eum, at sequi magni ex, obcaecati
        eveniet quo natus voluptatum expedita aliquam odit culpa? Dicta,
        inventore earum!
      </p>
      <div className="d-flex justify-content-center">
        <div className="row gap-2">
          <div className="d-flex">
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    First name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="message" className="form-label">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Hello World!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your message.
                  </div>
                </div>
              </div>

              <button
                className="w-100 btn btn-primary btn-lg mt-4"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
