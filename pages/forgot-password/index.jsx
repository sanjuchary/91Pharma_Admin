import React, { useState } from "react";
import Link from "next/link";
import { Form } from "reactstrap";

// form
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import Header from "../../components/layout/Header";
import Alert from "../../components/Alert";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

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

  const onSubmit = () => {
    setStatus({
      isLoading: true,
      status: status.status,
      message: status.message,
    });
    setTimeout(() => {
      setStatus({
        isLoading: false,
        status: status.status,
        message: status.message,
      });
    }, 2000);
  };
  return (
    <React.Fragment>
      <Header
        heading="Forgot Password"
        description="Please enter your email address to reset your password"
      />
      <div className="mt-3 p-3">
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
          {/* submit */}
          <div className="mt-3">
            <button
              className="btn btn-dark"
              type="submit"
              disabled={status.isLoading}
            >
              {status.isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </Form>

        <p className="text-center fs-7">
          <Link href="/" passHref>
            <span className="cursor__pointer text-primary">Back to login</span>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
};
Home.layout = "Public";
export default Home;
