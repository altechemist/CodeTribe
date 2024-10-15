import { useFormik } from "formik";
import { registrationSchema } from "../schemas";

const onSubmit = async (values: unknown, actions: { resetForm: () => void; }) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Show an alert for successful registration
  window.alert("Registration successful!");

  actions.resetForm();
};

function RegistrationForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit,
  });

  return (
    <div className="container-sm col-6 p-3">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group mb-2">
          <div className="d-flex justify-content-between my-1">
            <label htmlFor="nameInput">Name</label>
            <label htmlFor="nameInput">
              Required <span className="text-danger">*</span>
            </label>
          </div>
          <input
            type="text"
            className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
            id="nameInput"
            name="name"
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <div className="invalid-feedback">{errors.name}</div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <div className="d-flex justify-content-between my-1">
            <label htmlFor="emailInput">Email</label>
            <label htmlFor="emailInput">
              Required <span className="text-danger">*</span>
            </label>
          </div>
          <input
            type="email"
            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
            id="emailInput"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <div className="invalid-feedback">{errors.email}</div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <div className="d-flex justify-content-between my-1">
            <label htmlFor="inputPassword">Password</label>
            <label htmlFor="inputPassword">
              Required <span className="text-danger">*</span>
            </label>
          </div>
          <input
            type="password"
            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
            id="inputPassword"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password ? (
            <div className="invalid-feedback">{errors.password}</div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <div className="d-flex justify-content-between my-1">
            <label htmlFor="inputPassword1">Confirm Password</label>
            <label htmlFor="inputPassword1">
              Required <span className="text-danger">*</span>
            </label>
          </div>
          <input
            type="password"
            className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
            id="inputPassword1"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          ) : null}
        </div>
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="checkTCs"
            name="terms"
            required
          />
          <label className="form-check-label" htmlFor="checkTCs">
            Accept Terms and Conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
