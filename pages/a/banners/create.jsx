import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BreadCrumb from "../../../components/BreadCrumb";
import axios from "axios"; // Import axios from axios package directly
import { useRouter } from "next/router";

const SingleImageUpload = ({ control, name }) => {
  const handleImageChange = (e, onChange) => {
    const file = e.target.files[0]; // Only take the first file
    onChange(file);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <input type="file" onChange={(e) => handleImageChange(e, onChange)} />
      )}
    />
  );
};

const Banner = () => {
  const router = useRouter();

  const schema = Yup.object().shape({
    screen_name: Yup.string().required("Type is required"),
    images: Yup.mixed().required("Image is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("screen_name", data.screen_name);
    formData.append("images", data.images); // Append the file object itself

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/banner/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Response:", response.data);
      router.push("/a/banners");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Banners", url: "/a/banners" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-wrap gap-3">
          <div className="form-group col-5">
            <label htmlFor="screen_name">Select Banner Type</label>
            <select
              id="screen_name"
              {...register("screen_name")}
              className={`form-control ${
                errors.screen_name ? "is-invalid" : ""
              }`}
            >
              <option value="">Select Type</option>
              <option value="Categories">Categories</option>
              <option value="Offers">Offers</option>
              <option value="Home">Home</option>
            </select>
            {errors.screen_name && (
              <div className="invalid-feedback">
                {errors.screen_name.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="images">Image</label>
            <div>
              <SingleImageUpload control={control} name="images" />
              {errors.images && (
                <div className="invalid-feedback">{errors.images.message}</div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-dark mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

Banner.layout = "Admin";
export default Banner;
