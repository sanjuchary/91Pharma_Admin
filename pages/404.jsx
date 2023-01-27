import Link from "next/link";
import bg from "../assets/images/NotFound.gif";

const NotFound = () => {
  //insert this image in background using inline style

  const style = {
    backgroundImage: `url(${bg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "88vh",
  };

  return (
    <div className="container" style={style}>
      <div className="row ">
        <div>
          <Link href="/a/dashboard">
            <a className="btn btn-dark btn-sm">Go to Dashboard</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

NotFound.layout = "Admin";
export default NotFound;
