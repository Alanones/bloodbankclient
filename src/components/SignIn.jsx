import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addUserToLocalStorage } from "../utils/localStorage";
import { ClientContext } from "../contexts/client";

const SignIn = () => {
  const { setBanks } = useContext(ClientContext);
  const navigate = useNavigate();

  const submitForm = async (values, setSubmitting) => {
    try {
      setSubmitting(true);
      const res = await customFetch.post("/users/login", values);
      setSubmitting(false);
      const { user } = await res?.data;
      addUserToLocalStorage(res?.data);
      if (user && !user?.isAdmin) {
        navigate("/client");
        toast("Login Successfull!", {
          type: "success",
        });
      } else if (user && user?.isAdmin) {
        navigate("/admin");
        toast("Login Successfull!", {
          type: "success",
        });
      } else {
        toast("Something went wrong", {
          type: "error",
        });
      }
    } catch (e) {
      toast("Something went wrong", {
        type: "error",
      });
      console.log(e);
      setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={{ email: "moses@gmail.com", password: "p3ftw34F4%4$64" }}
      validationSchema={Yup.object({
        password: Yup.string().min(8, "Must be minium of 8 characters").required("Password required"),
        email: Yup.string().email("Invalid email address").required("Email required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        submitForm(values, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Stack spacing={2} direction="column">
            <Field className="field" name="email" type="email" placeholder="Email" />
            <div className="error">
              <ErrorMessage name="email" />
            </div>
            <Field className="field" name="password" type="password" placeholder="Password" />
            <div className="error">
              <ErrorMessage name="password" />
            </div>

            <button type="submit" className="btn">
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
