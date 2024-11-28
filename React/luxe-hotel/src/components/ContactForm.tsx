import Heading from "./Heading";

export default function ContactForm() {
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
            <form className="needs-validation">
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    value=""
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
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
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
