import { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

const ProfileDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotificationBox = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    let userName = getCookie("user_name");
    setUserName(userName);
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <button
        className="btn btn-transparent common__outline__none"
        onClick={toggleNotificationBox}
      >
        <i className="bx bx-bell bx-sm"></i>
      </button>
      {isNotificationOpen && (
        <div
          className="notification-box"
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            width: "300px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4>Notifications</h4>
          <ul>
            <li>Notification 1</li>
            <li>Notification 2</li>
            <li>Notification 3</li>
          </ul>
        </div>
      )}
      <Dropdown
        toggle={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
      >
        <DropdownToggle
          className="
            bg-transparent text-dark border-0
            common__outline__none
          "
          caret
        >
          Welcome {userName}
        </DropdownToggle>
        <DropdownMenu className="shadow border">
          <DropdownItem>My Account</DropdownItem>
          <DropdownItem>
            <Link href="/a/logout">
              <span>Logout</span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
