import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

function MyNavBar(args: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const MyNavbar = (
    <>
      <Navbar className="" color="secondary" dark>
        <NavbarBrand href="/">My Brand</NavbarBrand>
      </Navbar>
    </>
  );

  return MyNavbar;
}

export default MyNavBar;
