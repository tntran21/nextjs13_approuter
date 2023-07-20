"use client";

import Link from "next/link";
import { StyledHeader } from "./styles";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const avatarImage = require("@/assets/images/avatar.jpg");

function Header() {
  const { data: session } = useSession();

  const [provider, setProvider] = useState(null);
  const [toggleShowInfo, setToggleShowInfo] = useState(false);
  //   useEffect(() => {
  // setProvider(session);
  // }, [session])

  console.log("session", session);

  return (
    <StyledHeader>
      <div className="header-logo">LOGO</div>
      <nav className="nav flex items-center">
        <Link className="nav-item mr-3" href="/">
          Home
        </Link>
        <Link className="nav-item mr-3" href="/about">
          About
        </Link>

        {session?.user ? (
          <>
            <Image
              className="rounded-[50%] mr-2"
              src={avatarImage}
              alt="avatar"
              width={40}
              height={40}
              onClick={() => setToggleShowInfo(!toggleShowInfo)}
            />

            {toggleShowInfo && (
              <div className="flex absolute right-[10px] top-[55px] dropdown p-3 bg-white">
                <div className="  text-black break-normal">
                  <button onClick={() => setToggleShowInfo(!toggleShowInfo)}>Sign out</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </nav>
    </StyledHeader>
  );
}

export default Header;
