import axios from "axios";

export const onSubmitAddProduct = (e, props, handleSweetAlert) => {
  let formData = new FormData();

  formData.append("name", e["name"]);
  formData.append("product_id", e["product_id"]);
  formData.append("discount", e["discount"]);
  formData.append("price", e["price"]);
  formData.append("igst", e["igst"]);
  formData.append("description", e["description"]);
  formData.append("hsn", e["hsn"]);
  formData.append("quantity", e["quantity"]);
  formData.append("context", e["context"]);
  formData.append("composition", e["composition"]);
  formData.append("brand_id", e["brand_id"]);
  formData.append("category_id", e["category_id"]);
  formData.append("sub_category_id", e["sub_category_id"]);

  axios
    .post(`https://admin.91pharma.in/api/v1` + props.api.update.url, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
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
      handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      console.log(err);
    });
};

export const onSubmitAddForm = (e, props, handleSweetAlert) => {
  axios
    .post(
      `https://admin.91pharma.in/api/v1` + props.api.get.url,
      {
        form_type: e["form_type"],
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      handleSweetAlert(
        true,
        "Success",
        res?.data?.message || "updated Successfully",
        "success"
      );
    })
    .catch((err) => {
      handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      console.log(err);
    });
};

// export const onSubmitAddCategory = (e, props, handleSweetAlert) => {
//   axios
//     .post(
//       `https://admin.91pharma.in/api/v1` + props.api.update.url,
//       {
//         name: e["name"],
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     )
//     .then((res) => {
//       handleSweetAlert(
//         true,
//         "Success",
//         res?.data?.message || "updated Successfully",
//         "success"
//       );
//     })
//     .catch((err) => {
//       handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
//       console.log(err);
//     });
// };

export const onSubmitAddCategory = (e, props, handleSweetAlert) => {
  const formData = new FormData();
  formData.append("name", e["name"]);
  if (e["image"]) {
    formData.append("image", e["image"][0]); // Assuming image is a FileList
  }

  axios
    .post(`https://admin.91pharma.in/api/v1` + props.api.update.url, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      handleSweetAlert(
        true,
        "Success",
        res?.data?.message || "Updated Successfully",
        "success"
      );
    })
    .catch((err) => {
      handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      console.log(err);
    });
};

// export const onSubmitAddSubCategory = (e, props, handleSweetAlert) => {
//   const id = typeof String(e["category_id"]);
//   console.log("Values", id);
//   axios
//     .post(
//       `https://admin.91pharma.in/api/v1` + props.api.update.url,formData
//       {
//         name: e["name"],
//         category_id: String(e["category_id"]),
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     )
//     .then((res) => {
//       handleSweetAlert(
//         true,
//         "Success",
//         res?.data?.message || "updated Successfully",
//         "success"
//       );
//     })
//     .catch((err) => {
//       handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
//       console.log(err);
//     });
// };

export const onSubmitAddSubCategory = (e, props, handleSweetAlert) => {
  const formData = new FormData();
  formData.append("name", e["name"]);
  formData.append("category_id", String(e["category_id"]));
  if (e["image"]) {
    formData.append("image", e["image"][0]); // Assuming image is a FileList
  }

  axios
    .post(`https://admin.91pharma.in/api/v1` + props.api.update.url, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data", // Ensuring the correct content type for form data
      },
    })
    .then((res) => {
      handleSweetAlert(
        true,
        "Success",
        res?.data?.message || "Updated Successfully",
        "success"
      );
    })
    .catch((err) => {
      handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      console.log(err);
    });
};

export const onSubmitAddBrand = (e, props, handleSweetAlert) => {
  const formData = new FormData();
  formData.append("name", e["name"]);
  if (e["image"]) {
    formData.append("image", e["image"][0]); // Assuming image is a FileList
  }

  axios
    .post(`https://admin.91pharma.in/api/v1` + props.api.update.url, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data", // Ensuring the correct content type for form data
      },
    })
    .then((res) => {
      handleSweetAlert(
        true,
        "Success",
        res?.data?.message || "Updated Successfully",
        "success"
      );
    })
    .catch((err) => {
      handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      console.log(err);
    });
};

// export const onSubmitAddCoupon = (e, props, handleSweetAlert) => {
//   axios
//     .post(
//       `https://admin.91pharma.in/api/v1` + props.api.update.url,
//       {
//         code: e["code"],
//         discount: String(e["discount"]),
//         min_value: String(e["min_value"]),
//         max_value: String(e["max_value"]),
//         max_amount: String(e["max_amount"]),
//         expiry_date: String(e["expiry_date"]),
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     )
//     .then((res) => {
//       handleSweetAlert(
//         true,
//         "Success",
//         res?.data?.message || "updated Successfully",
//         "success"
//       );
//     })
//     .catch((err) => {
//       handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
//       console.log(err);
//     });
// };

export const onSubmitAddCoupon = (e, props, handleSweetAlert) => {
  const formData = new FormData();
  formData.append("code", e["code"]);
  formData.append("discount", String(e["discount"]));
  formData.append("min_value", String(e["min_value"]));
  formData.append("max_value", String(e["max_value"]));
  formData.append("max_amount", String(e["max_amount"]));
  formData.append("expiry_date", String(e["expiry_date"]));
  if (e["image"]) {
    formData.append("image", e["image"][0]); // Assuming image is a FileList
  }

  axios
    .post(`https://admin.91pharma.in/api/v1` + props.api.update.url, formData, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data", // Ensuring the correct content type for form data
      },
    })
    .then((res) => {
      handleSweetAlert(
        true,
        "Success",
        res?.data?.message || "Updated Successfully",
        "success"
      );
    })
    .catch((err) => {
      handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      console.log(err);
    });
};
