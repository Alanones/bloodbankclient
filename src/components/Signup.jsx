import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../contexts/client";

const Signup = () => {
  const { setUser } = useContext(ClientContext);
  const navigate = useNavigate();
  const submitForm = async (values, setSubmitting) => {
    try {
      setSubmitting(true);
      const res = await customFetch.post("/users", values);
      const user = res?.data;
      if (user) {
        await setUser(res.data);
        navigate("/client");
        toast("Singup Successfull!", {
          type: "success",
        });
        setSubmitting(false);
      } else {
        toast("Something went wrong. Try again", { type: "error" });
        setSubmitting(false);
      }
    } catch (error) {
      toast("Something went wrong. Try again", { type: "error" });
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "p3ftw34F4%4$64", location: "" }}
      validationSchema={Yup.object({
        name: Yup.string().max(30, "Must be 30 characters or less").required("Name required"),
        location: Yup.string().max(20, "Must be 20 characters or less").required("Location required"),
        password: Yup.string().min(15, "Must be minium of 8 characters").required("Password required"),
        email: Yup.string().email("Invalid email address").required("Email required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        submitForm(values, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2} direction="column">
            <Field className="field" name="name" type="text" placeholder="Your Name" />
            <div className="error">
              <ErrorMessage name="name" />
            </div>
            <Field className="field" name="email" type="email" placeholder="Email" />
            <div className="error">
              <ErrorMessage name="email" />
            </div>
            <Field className="field" name="password" type="password" placeholder="Password" />
            <div className="error">
              <ErrorMessage name="password" />
            </div>
            <Field className="field" name="location" type="text" placeholder="Your Hospital" />
            <div className="error">
              <ErrorMessage name="location" />
            </div>
            <button type="submit" className="btn">
              {isSubmitting ? "Submitting" : "Register"}
            </button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
