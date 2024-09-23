import * as yup from "yup";

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;


export const registrationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  name: yup.string().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Password must have min 5 chars including uppercase and number" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
