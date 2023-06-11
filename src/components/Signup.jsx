import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Signup = () => {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string().max(15, "Must be 15 characters or less").required("First name required"),
        lastName: Yup.string().max(20, "Must be 20 characters or less").required("Last name required"),
        password: Yup.string().min(15, "Must be minium of 8 characters").required("Password required"),
        email: Yup.string().email("Invalid email address").required("Email required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <Stack spacing={2} direction="column">
          <Field className="field" name="firstName" type="text" placeholder="First Name" />
          <div className="error">
            <ErrorMessage name="firstName" />
          </div>

          <Field className="field" name="lastName" type="text" placeholder="Last Name" />
          <div className="error">
            <ErrorMessage name="lastName" />
          </div>

          <Field className="field" name="email" type="email" placeholder="Email" />
          <div className="error">
            <ErrorMessage name="email" />
          </div>
          <Field className="field" name="password" type="password" placeholder="Password" />
          <div className="error">
            <ErrorMessage name="password" />
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default Signup;
