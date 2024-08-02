import axios from "axios";

export const onSubmitAddProduct = (e, props, handleSweetAlert) => {
  let formData = new FormData();

  formData.append("name", e["name"]);
  formData.append("product_id", e["product_id"]);
  formData.append("price", e["price"]);
  formData.append("discount", e["discount"]);
  formData.append("igst", e["igst"]);
  formData.append("hsn", e["hsn"]);
  formData.append("quantity", e["quantity"]);
  formData.append("description", e["description"]);
  formData.append("context", e["context"]);
  formData.append("composition", e["composition"]);
  formData.append("packing_type", e["packing_type"]);
  formData.append("packing_size", e["packing_size"]);
  formData.append("schedule", e["schedule"]);
  formData.append("category_id", e["category_id"]);
  formData.append("brand_id", e["brand_id"]);
  formData.append("sub_category_id", e["sub_category_id"]);
  formData.append("usage", e["usage"]);
  formData.append("about_salt", e["about_salt"]);
  formData.append("mechanism_of_action", e["mechanism_of_action"]);
  formData.append("pharmacokinets", e["pharmacokinets"]);
  formData.append("onset_of_action", e["onset_of_action"]);
  formData.append("duration_of_action", e["duration_of_action"]);
  formData.append("half_life", e["half_life"]);
  formData.append("side_effects", e["side_effects"]);
  formData.append("contra_indications", e["contra_indications"]);
  formData.append("special_precautions", e["special_precautions"]);
  formData.append(
    "pregnancy_related_information",
    e["pregnancy_related_information"]
  );
  formData.append(
    "product_alchol_interaction",
    e["product_alchol_interaction"]
  );
  formData.append(
    "old_age_related_information",
    e["old_age_related_information"]
  );
  formData.append(
    "breast_feeding_related_information",
    e["breast_feeding_related_information"]
  );
  formData.append("child_related_information", e["child_related_information"]);
  formData.append("indications", e["indications"]);
  formData.append("typical_dosage", e["typical_dosage"]);
  formData.append("storage_requirements", e["storage_requirements"]);
  formData.append("effects_mixed_dosage", e["effects_mixed_dosage"]);
  formData.append("effects_overdose", e["effects_overdose"]);
  formData.append("expertise_advice", e["expertise_advice"]);
  formData.append("how_to_use", e["how_to_use"]);
  formData.append("faqs", e["faqs"]);
  if (e["product_images"]) {
    formData.append("product_images", e["product_images"][0]); // Assuming image is a FileList
  }
  formData.append("product_images", e["product_images"]);

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
  console.log("ram", props.api.get.url);
  axios
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.get.url,
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
//       `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
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
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    )
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

export const onUpdateCategory = (e, props, handleSweetAlert) => {
  const formData = new FormData();
  formData.append("name", e["name"]);
  if (e["image"]) {
    formData.append("image", e["image"][0]); // Assuming image is a FileList
  }

  axios
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    )
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
//       `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,formData
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
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Ensuring the correct content type for form data
        },
      }
    )
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
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Ensuring the correct content type for form data
        },
      }
    )
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
//       `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
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
    .post(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}` + props.api.update.url,
      formData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Ensuring the correct content type for form data
        },
      }
    )
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
