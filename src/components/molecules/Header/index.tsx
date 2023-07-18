"use client";

import Link from "next/link";
import { StyledHeader } from "./styles";

function Header() {
  return (
    <StyledHeader>
      <div className="header-logo">LOGO</div>
      <nav className="nav">
        <Link className="nav-item mr-3" href="/">
          Home
        </Link>
        <Link className="nav-item mr-3" href="/about">
          About
        </Link>

        <button>Sign out</button>
      </nav>
    </StyledHeader>
  );
}

export default Header;
