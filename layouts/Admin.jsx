import { useState, useEffect } from "react";

import { useWindowSize } from "../helpers/common/windowSize";

// components
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

const Admin = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) {
      setIsOpen(false);
    }
  }, [size]);

  return (
    <div className="layout__admin__wrapper d-flex">
      {isOpen && <Sidebar setIsOpen={setIsOpen} size={size} />}
      <div className="w-100">
        <Navbar handleToggle={() => setIsOpen(!isOpen)} />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default Admin;
