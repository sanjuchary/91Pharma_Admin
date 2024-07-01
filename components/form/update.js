import { useEffect, useState, useRef, useCallback } from "react";
import { Form } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SweetAlert from "../common/SweetAlert";
import Select from "react-select";
import axios from "axios";
import Router from "next/router";
import Image from "next/image";
import {
  onSubmitAddBrand,
  onSubmitAddCategory,
  onSubmitAddCoupon,
  onSubmitAddForm,
  onSubmitAddProduct,
  onSubmitAddSubCategory,
} from "../../services/submitFunc";

const Update = (props) => {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [imageDataList, setImageDataList] = useState([]);

  const modifyURL = (url) => {
    return url.replace(
      "https://localhost/8000/api/v1//",
      "https://admin.91pharma.in/api/v1/"
    );
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchImages = useCallback(async (documents) => {
    try {
      if (!documents || !Array.isArray(documents) || documents.length === 0) {
        console.error("No image documents found");
        return;
      }

      const imagePromises = documents.map(async (document) => {
        const response = await axios.get(modifyURL(document.url), {
          responseType: "blob",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const blob = response.data;
        const base64Image = await convertBlobToBase64(blob);
        return base64Image;
      });

      const imageDataList = await Promise.all(imagePromises);
      setImageDataList(imageDataList);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  useEffect(() => {
    if (data.data?.documents) {
      fetchImages(data.data.documents);
    }
  }, [data, fetchImages]);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `https://admin.91pharma.in/api/v1/category/get/by/${selectedCategory}`,
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
    defaultValues: data || {},
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
      case "subCategory":
        onSubmitAddSubCategory(e, props, handleSweetAlert);
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
      .get(`https://admin.91pharma.in/api/v1${props.api.get.url}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let response = res.data;
        console.log("res", response);
        setData(response);

        let formData = {};
        props.values.forEach((value) => {
          if (response.data) {
            formData[value.name] =
              value.label === "Image"
                ? response.data.documents[0][value.name]
                : response.data[value.name];
          }
        });

        reset(formData);

        props.values.forEach((value) => {
          if (value.defaultValue !== "" && value.defaultValue !== null) {
            if (value.isMulti) {
              setValue(
                value.name,
                value.defaultValue.map((row) => row.value)
              );
            } else {
              setValue(value.name, value.defaultValue.value);
              console.log("Image", value.name, value.defaultValue.value);
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

  console.log("data_Sub", data);

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
                          field.onChange(null);
                          setSubCategories([]);
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
                    {imageDataList.map((base64Image, idx) => (
                      <div key={idx} className="mb-2">
                        <Image
                          src={base64Image}
                          alt={`image-${idx}`}
                          className="common_image"
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                    <input
                      className="form-control"
                      id={`form-element-${value.name}`}
                      name={value.name}
                      type={value.type}
                      placeholder={value.placeholder}
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
                  defaultValue={data?.data ? data.data[value.name] : ""}
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
