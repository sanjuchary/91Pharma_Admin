import ProfileDropdown from "./ProfileDropdown";

const Navbar = (props) => {
  return (
    <div className="common__navbar shadow p-2">
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="border-0 rounded-3 bg-transparent"
          onClick={props.handleToggle}
        >
          <i className="bx bx-menu bx-sm"></i>
        </button>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
