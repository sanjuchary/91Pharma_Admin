import React, { useState } from "react";
import Link from "next/link";
import { Form } from "reactstrap";

// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import Header from "../components/layout/Header";
import Alert from "../components/Alert";

// js
import { loginSchema as schema } from "../utils/validations/auth";
import { loginService } from "../services/auth";

const Home = () => {
  const [status, setStatus] = useState({
    isLoading: false,
    status: null,
    message: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleStatus = (loading, formStatus, message) => {
    setStatus({
      isLoading: loading ? loading : status.isLoading,
      status: formStatus,
      message: message,
    });
  };

  const onSubmit = (data) => {
    handleStatus(true, null, null);
    loginService(data)
      .then((res) => {
        handleStatus(false, null, "");
      })
      .catch((err) => {
        let message = err.message || err.response.data.message;
        handleStatus(false, 0, "Invalid email or password");
      });
  };

  return (
    <React.Fragment>
      <Header
        heading="Welcome Back"
        description="Please log into your account to continue"
      />
      <div className="p-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Alert status={status.status} message={status.message} />
          {/* email */}
          <div className="form-group">
            <input
              type="email"
              className="form-control common__input"
              id="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            <p className="common__error__message">{errors.email?.message}</p>
          </div>
          {/* password */}
          <div className="form-group mt-3">
            <input
              type="password"
              className="form-control common__input"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            <p className="common__error__message">{errors.password?.message}</p>
          </div>
          {/* submit */}
          <div className="mt-3">
            <button
              className="btn btn-dark"
              type="submit"
              disabled={status.isLoading}
            >
              {status.isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </Form>

        <p className="text-center fs-7">
          Forgot your password?{" "}
          <Link href="/forgot-password" passHref>
            <span className="cursor__pointer text-primary text-decoration-none">
              reset here
            </span>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};
Home.layout = "Public";
export default Home;
