import * as yup from "yup";

const SignupValidation = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("Required"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Confirm your password"),
  companySignup: yup.boolean(),
  companyName: yup.string().when("companySignup", {
    is: true,
    then: yup.string().required("Required"),
    otherwise: yup.string(),
  }),
});

const SigninValidation = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()

    .required("Enter your password"),
});

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const CompanyFormValidation = yup.object().shape({
  companyName: yup
    .string()
    .max(50, "50 characters allowed")
    .required("Required"),
  tagline: yup.string().max(70, "70 characters allowed").required("Required"),
  username: yup
    .string()
    .matches(
      /^(?=.{4,20}$)(?![-])(?!.*[_.]{2})[a-z0-9-]+(?<![-])$/,
      "4-20 small characters, No special characters, only '-' is allowed inside"
    )
    .required("Required")
    .nullable(),

  founded: yup.string().required("Required"),
  employees: yup.string().required("Required"),
  rate: yup.string().required("Required"),
  website: yup.string().url("Enter a valid URL").required("Required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  address: yup.object().shape({
    country: yup.string().required("Required"),
    state: yup.string().required("Required"),
    city: yup.string().required("Required"),
    streetAddress: yup.string().required("Required"),
  }),
  summary: yup.string().required("Required"),
  services: yup.array().of(
    yup.object().shape({
      title: yup.string().required("Required"),
      details: yup.string().required("Required"),
    })
  ),
  //services: yup.string().required("Required"),
});

const CompanyUserValidation = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("Required"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Required"),

  updatePassword: yup.boolean(),
  oldPassword: yup.string().when("updatePassword", {
    is: true,
    then: yup.string().required("Enter your password"),
    otherwise: yup.string(),
  }),

  newPassword: yup.string().when("updatePassword", {
    is: true,
    then: yup
      .string()
      .min(8, "Password must contain at least 8 characters")
      .required("Enter your password"),
    otherwise: yup.string(),
  }),

  confirmPassword: yup.string().when("updatePassword", {
    is: true,
    then: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Password does not match")
      .required("Confirm your password"),
    otherwise: yup.string(),
  }),

  // oldPassword: yup.string().required("Enter your password"),
  // newPassword: yup
  //   .string()
  //   .min(8, "Password must contain at least 8 characters")
  //   .required("Enter your password"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("newPassword")], "Password does not match")
  //   .required("Confirm your password"),
});

const companyPortfolioValidation = yup.object().shape({
  title: yup.string().required("Required"),
  timeline: yup.string().required("Required"),

  projectCost: yup.string().required("Required"),
  industry: yup.string().required("Required"),
  location: yup.string().required("Required"),
  summary: yup.string().required("Required"),
});

const clientProjectValidation = yup.object().shape({
  title: yup.string().required("Required"),

  rate: yup.string().required("Required"),
  location: yup.string().required("Required"),
  details: yup.string().required("Required"),
});

const sendProposalValidation = yup.object().shape({
  rate: yup
    .string()

    .matches(/^(?=.{0,20}$)(?![-])[0-9-]+(?<![-])$/, "Enter in format 0-9")
    .required("Required"),

  message: yup.string().required("Required"),
});

const ContactUsValidation = yup.object().shape({
  fullName: yup.string().required("Required"),

  subject: yup.string().required("Required"),
  message: yup.string().required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const clientReviewValidation = yup.object().shape({
  title: yup.string().required("Required"),

  score: yup.string().required("Required"),
  details: yup.string().required("Required"),
});

const promotionValidation = yup.object().shape({
  title: yup.string().required("Required"),

  duration: yup.string().required("Required"),
});

export {
  SignupValidation,
  SigninValidation,
  CompanyFormValidation,
  CompanyUserValidation,
  companyPortfolioValidation,
  clientProjectValidation,
  sendProposalValidation,
  ContactUsValidation,
  clientReviewValidation,
  promotionValidation,
};
