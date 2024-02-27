import React, { useState } from "react";
import Link from "next/link";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const Sidebar = (props) => {
  const [items, setItems] = useState([
    {
      name: "Dashboard",
      icon: "bx bx-home",
      url: "/a/dashboard",
    },
    {
      name: "Brands",
      icon: "bx bx-purchase-tag-alt",
      url: "",
      show: false,
      items: [
        {
          name: "Add Brand",
          url: "/a/brands/create",
        },
        {
          name: "Brands",
          url: "/a/brands",
        },
      ],
    },
    {
      name: "Categories",
      icon: "bx bx-category",
      url: "",
      show: false,
      items: [
        {
          name: "Add Category",
          url: "/a/categories/create",
        },
        {
          name: "Categories",
          url: "/a/categories",
        },
      ],
    },
    {
      name: "Coupons",
      icon: "bx bxs-coupon",
      url: "",
      show: false,
      items: [
        {
          name: "Add Coupon",
          url: "/a/coupons/create",
        },
        {
          name: "Coupons",
          url: "/a/coupons",
        },
      ],
    },
    {
      name: "Products",
      icon: "bx bx-capsule",
      url: "",
      show: false,
      items: [
        {
          name: "Add Product",
          url: "/a/products/create",
        },
        {
          name: "Products",
          url: "/a/products",
        },
      ],
    },
    {
      name: "Form Types",
      icon: "bx bx-capsule",
      url: "",
      show: false,
      items: [
        {
          name: "Add Form Type",
          url: "/a/form-types/create",
        },
        {
          name: "Form Types",
          url: "/a/form-types",
        },
      ],
    },
    // {
    //   name: "Credit",
    //   icon: "bx bx-capsule",
    //   url: "",
    //   show: false,
    //   items: [
    //     {
    //       name: "Credits",
    //       url: "/a/form-types/create",
    //     },
    //     {
    //       name: "Form Types",
    //       url: "/a/form-types",
    //     },
    //   ],
    // },
    {
      name: "Credit",
      icon: "bx bx-shopping-bag",
      url: "/a/credits",
      show: false,
    },
    {
      name: "Orders",
      icon: "bx bx-shopping-bag",
      url: "/a/orders",
      show: false,
    },
    {
      name: "Shops",
      icon: "bx bx-shopping-bag",
      url: "/a/shops",
      show: false,
    },

    {
      name: "Users",
      icon: "bx bx-user",
      url: "/a/users",
      show: false,
    },
    {
      name: "Upload",
      icon: "bx bx-user",
      url: "/a/upload",
      show: false,
    },
  ]);

  const handleShow = (item) => {
    items.map((i) => {
      if (i.name === item.name) {
        i.show = !i.show;
      }
    });
    setItems([...items]);
  };

  return (
    <div className="layout__admin__sidebar col-12 col-md-auto">
      <SimpleBar style={{ maxHeight: "100vh", minWidth: "35vh" }}>
        <div className="layout__admin__content h-100 p-3">
          <div className="layout__sidebar">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-transparent common__outline__none"
                onClick={() => props.setIsOpen(false)}
              >
                <i className="bx bx-x bx-md"></i>
              </button>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <h5>91_Pharma</h5>
            </div>
            {items.map((item, key) => (
              <div key={key} className="">
                <div
                  className={`
                layout__sidebar__item__header
                d-flex justify-content-between align-items-center
                rounded
                p-2
                cursor__pointer
              `}
                  onClick={() => handleShow(item)}
                >
                  <div>
                    <Link href={item.url}>
                      <span className="d-inline-flex align-items-center">
                        <i className={`${item.icon} fs-5 me-2`}></i>
                        <span className="fs-6">{item.name}</span>
                      </span>
                    </Link>
                  </div>
                  <div className="d-inline-flex">
                    {item.items && item.items.length > 0 && (
                      <i
                        className={`bx bx-chevron-down fs-5 me-2 ${
                          item.show ? "bx-rotate-180" : ""
                        }`}
                      ></i>
                    )}
                  </div>
                </div>
                {item.show && item.items && (
                  <div className="ps-4 ms-2">
                    {item.items.map((child, childKey) => (
                      <div
                        className="
                      layout__sidebar__item__header 
                      d-flex align-items-center
                      rounded  
                      p-1 ps-2
                      cursor__pointer
                    "
                        key={childKey}
                      >
                        <Link href={child.url}>
                          <span className="fs-6">{child.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
