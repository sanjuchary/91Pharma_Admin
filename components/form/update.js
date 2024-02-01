import { useEffect, useState, useRef } from "react";
import { Form } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SweetAlert from "../common/SweetAlert";
// import axios from "../../utils/axios";
import Select from "react-select";
import axios from "axios";

import Router from "next/router";
import {
  onSubmitAddBrand,
  onSubmitAddCategory,
  onSubmitAddCoupon,
  onSubmitAddForm,
  onSubmitAddProduct,
} from "../../services/submitFunc";

const Update = (props) => {
  const [data, setData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_PROD_API_URL}/category/get/by/${selectedCategory}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          setSubCategories(response.data?.data?.sub_categories);
        })
        .catch((error) => {
          console.error("Error fetching sub-categories:", error);
        });
    }
  }, [selectedCategory]);

  useEffect(() => {
    console.log(subCategories);
  }, [subCategories]);

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

  const submitFunction = (e) => {
    switch (props.formType) {
      case "products":
        onSubmitAddProduct(e, props, handleSweetAlert);
        break;
      case "form":
        onSubmitAddForm(e, props, handleSweetAlert);
        break;
      case "category":
        onSubmitAddCategory(e, props, handleSweetAlert);
        break;
      case "brand":
        onSubmitAddBrand(e, props, handleSweetAlert);
        break;
      case "coupon":
        onSubmitAddCoupon(e, props, handleSweetAlert);
        break;
      default:
        // Handle other cases if needed
        break;
    }
  };

  const getData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.get.url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let response = res.data;
        setData(response);
        let formData = {};
        props.values.map((value) => {
          formData[value.name] = response.data[value.name];
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
      <Form ref={FormElement} onSubmit={handleSubmit(submitFunction)}>
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
                      options={
                        value.name === "sub_category_id"
                          ? subCategories.map((option) => ({
                              value: option.id,
                              label: option.name,
                            }))
                          : value.options?.map((option) => ({
                              value: option.id,
                              label: option.name,
                            }))
                      }
                      onChange={(e) => {
                        if (value.name === "category_id") {
                          setSelectedCategory(e.value);
                          // Clear sub-category value when main category changes
                          field.onChange(null); // Set sub-category value to null
                          setSubCategories([]); // Clear subCategories
                        } else {
                          field.onChange(e);
                        }
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
