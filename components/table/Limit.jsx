import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Limit = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>{props.limit}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => props.handleLimit(10)}>10</DropdownItem>
        <DropdownItem onClick={() => props.handleLimit(25)}>25</DropdownItem>
        <DropdownItem onClick={() => props.handleLimit(30)}>30</DropdownItem>
        <DropdownItem onClick={() => props.handleLimit(50)}>50</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Limit;
