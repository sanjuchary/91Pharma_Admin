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
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/x-www-form-urlencoded",
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

export const onSubmitAddForm = (e, props, handleSweetAlert) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
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

export const onSubmitAddCategory = (e, props, handleSweetAlert) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      {
        name: e["name"],
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

export const onSubmitAddBrand = (e, props, handleSweetAlert) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      {
        name: e["name"],
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

export const onSubmitAddCoupon = (e, props, handleSweetAlert) => {
  axios
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      {
        code: e["code"],
        discount: String(e["discount"]),
        min_value: String(e["min_value"]),
        max_value: String(e["max_value"]),
        max_amount: String(e["max_amount"]),
        expiry_date: String(e["expiry_date"]),
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
