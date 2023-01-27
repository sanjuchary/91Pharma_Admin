import { useEffect, useState } from "react";
import axios from "../../utils/axios";

const Images = (props) => {
  const [images, setImages] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`/products/${props.id}`);
    setImages(data.images);
  };

  const uploadImage = async () => {
    // get files from input id "image"
    const images = document.getElementById("images").files;

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    await axios
      .post(`/products/images?product_id=${props.id}`, formData)
      .then((res) => {
        getData();
        // clear input
        document.getElementById("images").value = "";
      });
  };

  const deleteImage = (id) => {
    axios.delete(`/products/images/${id}`).then((response) => {
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="mt-3">
        <h5>Upload Images</h5>
        <input
          className="form-control"
          id="images"
          type="file"
          name="file"
          multiple
        />
        <button className="btn btn-dark mt-3" onClick={() => uploadImage()}>
          Upload
        </button>
      </div>

      <div className="row">
        {images.map((row, key) => (
          <div className="col-md-6" key={key}>
            <img src={row.image} alt={row.name} className="common__image" />
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                deleteImage(row.uuid);
              }}
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
