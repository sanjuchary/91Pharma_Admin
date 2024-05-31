import { useState, useEffect, useCallback } from "react";
import axios from "../../../utils/axios";
import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Modal from "react-modal";

const Brand = ({ defaultValue, options }) => {
  const router = useRouter();
  const { id, name } = router.query;
  console.log(router.query);

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const modifyURL = (url) => {
    return url.replace(
      "https://localhost/8000/api/v1/",
      "http://localhost:4000/api/v1/"
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

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/banner/get/${name}`
      );
      const bannersData = response.data.all_banners;
      const imagePromises = bannersData.map(async (banner) => {
        const imageResponse = await axios.get(modifyURL(banner.url), {
          responseType: "blob",
        });
        const blob = await imageResponse.data;
        const base64Image = await convertBlobToBase64(blob);
        return { ...banner, base64Image };
      });
      const bannersWithImages = await Promise.all(imagePromises);
      setBanners(bannersWithImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    if (id && name) {
      fetchImages();
    }
  }, [id, name, fetchImages]);

  const handleEditClick = (banner) => {
    setCurrentBanner(banner);
    setEditModalOpen(true);
  };

  const handleDeleteClick = async (bannerId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this banner?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/banner/${bannerId}`);
        setBanners(banners.filter((banner) => banner.id !== bannerId));
      } catch (error) {
        console.error("Error deleting banner:", error);
      }
    }
  };

  const handleEditSubmit = async (event) => {
    console.log("event", currentBanner);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      await axios.patch(
        `http://localhost:4000/api/v1/banner/update/${id}/document/${currentBanner.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchImages();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const handleImageChange = (event) => {
    setNewImage(event.target.files[0]);
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Banners", url: "/a/banners" },
        ]}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="banners-list d-flex flex-wrap gap-5">
            {banners.map((banner) => (
              <div key={banner.id} className="banner-item">
                <img
                  src={banner.base64Image}
                  alt={banner.name}
                  style={{ width: "40vw", height: "50vh", cursor: "pointer" }}
                />
                <p>{banner.name}</p>
                <div className="d-flex gap-3">
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                    className="rounded"
                    onClick={() => handleDeleteClick(banner.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="rounded"
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleEditClick(banner)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit Banner"
      >
        <h2>Edit Banner</h2>
        {currentBanner && (
          <form onSubmit={handleEditSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={currentBanner.name}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              style={{
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

Brand.layout = "Admin";
export default Brand;
