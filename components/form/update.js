import { useEffect, useState, useRef } from "react";
import { Form } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SweetAlert from "../common/SweetAlert";
import axios from "../../utils/axios";
import Select from "react-select";

import Router from "next/router";

const Update = (props) => {
  const [data, setData] = useState({});

  const [sweetAlert, setSweetAlert] = useState({
    show: false,
    title: "",
    text: "",
    type: "default",
  });

  const FormElement = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(props.schema),
    defaultValues: data,
  });
  const handleSweetAlert = (show, title, text, type) => {
    setSweetAlert({
      show: show || false,
      title: title || sweetAlert.title,
      text: text || sweetAlert.text,
      type: type || sweetAlert.type,
    });
  };
  const onRedirect = (url) => {
    Router.push(url);
  };
  const onSubmit = (e) => {
    if (props.isMultiPart) {
      let formData = new FormData();

      props.values.forEach((value, index) => {
        console.log(value);
        if (value.name === "image") {
          if (e[value.name]) {
            if (value.isSingle) {
              formData.append(value.name, e[value.name][0]);
            } else {
              formData.append(value.name, e[value.name]);
            }
          }
        } else {
          e[value.name] = e[value.name] === undefined ? null : e[value.name];
          formData.append(value.name, e[value.name]);
        }
      });
      axios({
        method: props.api.update.method,
        url: props.api.update.url,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          handleSweetAlert(
            true,
            "Success",
            res?.data?.message || "updated Successfully",
            "success"
          );
        })
        .catch((err) => {
          handleSweetAlert(
            true,
            "Error",
            err?.response?.data?.message,
            "error"
          );
        });
    } else {
      axios({
        method: props.api.update.method,
        url: props.api.update.url,
        data: e,
      })
        .then((res) => {
          handleSweetAlert(
            true,
            "Success",
            res ? res.data?.message : "updated Successfully",
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) {
            handleSweetAlert(
              true,
              "Warning",
              err.response.data.message,
              "warning"
            );
          } else {
            handleSweetAlert(
              true,
              "Error",
              err?.response?.data?.message,
              "error"
            );
          }
        });
    }
  };

  const getData = () => {
    axios
      .get(props.api.get.url)
      .then((res) => {
        let response = res.data;
        setData(response);
        let formData = {};
        props.values.map((value) => {
          formData[value.name] = response[value.name];
        });
        reset(formData);
        props.values.map((value) => {
          if (value.defaultValue != "" && value.defaultValue != null) {
            if (value.isMulit) {
              setValue(
                value.name,
                value.defaultValue.map((row) => row.value)
              );
            } else {
              setValue(value.name, value.defaultValue.value);
              console.log(value.name, value.defaultValue.value);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    props?.api?.get?.url && getData();
  }, []);

  return (
    <div>
      <SweetAlert
        show={sweetAlert.show}
        title={sweetAlert.title}
        text={sweetAlert.text}
        type={sweetAlert.type}
        onConfirm={() => {
          if (sweetAlert.type === "success" && props.redirectUrl) {
            onRedirect(props.redirectUrl);
          } else if (sweetAlert.type === "success") {
            getData();
            handleSweetAlert(false);
          } else {
            handleSweetAlert(false);
          }
        }}
        onCancel={() => {
          handleSweetAlert(false);
        }}
      />
      <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {props.values.map((value, index) =>
            value.type === "select" ? (
              <div className={`form-group col-6 mt-2`} key={index}>
                <label id={`form-element-${value.name}`}>{value.label}</label>

                <Controller
                  name={value.name}
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti={value.isMulti}
                      isClearable={true}
                      defaultValue={value.defaultValue}
                      options={value.options}
                      onChange={(e) => {
                        value.isMulti === true
                          ? setValue(
                              value.name,
                              JSON.stringify(e?.map((item) => item.value))
                            )
                          : setValue(value.name, e?.value);
                      }}
                    />
                  )}
                />
                <p className="text-danger mb-0">
                  {errors[value.name]?.message}
                </p>
              </div>
            ) : value.type === "checkbox" ? (
              <div className={`form-group col-6 mt-2`} key={index}>
                <div className="form-group form-check">
                  <input
                    name={value.name}
                    type="checkbox"
                    {...register(value.name)}
                    className={`form-check-input ${
                      errors[value.name] ? "is-invalid" : ""
                    }`}
                  />
                  <label htmlFor={value.label} className="form-check-label">
                    {value.label}
                  </label>
                  <p className="text-danger mb-0">
                    {errors[value.name]?.message}
                  </p>
                </div>
              </div>
            ) : value.type === "file" ? (
              <div className={`form-group col-6 mt-2`} key={index}>
                <label id={`form-element-${value.name}`}>{value.label}</label>
                <div className="row">
                  <div className="col-12">
                    {data[value.name] && (
                      <img
                        src={data[value.name] ? data[value.name] : ""}
                        alt={value.label}
                        className="common__image"
                      />
                    )}
                    <input
                      className="form-control"
                      id={`form-element-${value.name}`}
                      name={value.name}
                      type={value.type}
                      placeholder={value.placeholder}
                      defaultValue={data[value.name]}
                      {...register(value.name)}
                    />
                  </div>
                </div>
                <p className="text-danger mb-0">
                  {errors[value.name]?.message}
                </p>
              </div>
            ) : (
              <div
                className={`form-group ${value.customClass} mt-2`}
                key={index}
              >
                <label id={`form-element-${value.name}`}>{value.label}</label>
                <input
                  className="form-control"
                  id={`form-element-${value.name}`}
                  name={value.name}
                  type={value.type}
                  placeholder={value.placeholder}
                  defaultValue={data[value.name]}
                  {...register(value.name)}
                />
                <p className="text-danger mb-0">
                  {errors[value.name]?.message}
                </p>
              </div>
            )
          )}
        </div>

        <div className="row mt-2">
          <div className="col-md-12">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Update;
