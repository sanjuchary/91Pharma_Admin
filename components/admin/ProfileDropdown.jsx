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

  useEffect(() => {
    let userName = getCookie("user_name");
    setUserName(userName);
  }, []);

  return (
    <>
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
          {userName}
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
    </>
  );
};

export default ProfileDropdown;
