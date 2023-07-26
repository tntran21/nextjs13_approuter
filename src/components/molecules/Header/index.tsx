"use client";

import { StyledHeader } from "./styles";
import { useSession, signIn, getProviders, LiteralUnion, ClientSafeProvider, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultAvatar = require("@/assets/images/avatar.jpg");
const logoImage = require("@/assets/images/logo1.jpg");

type TProviders = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState<TProviders>(null);

  const [toggleShowInfo, setToggleShowInfo] = useState(false);

  const onChangeNav = (path: string) => {
    setToggleShowInfo(false);
    router.push(path);
  };

  const handlerLogout = () => {
    signOut();
    setToggleShowInfo(false);
    router.push("/");
  };

  useEffect(() => {
    (async () => {
      const providersRes = await getProviders();
      console.log("providersRes", providersRes?.google.id);
      setProviders(providersRes);
    })();
  }, []);

  return (
    <StyledHeader>
      <div className="header-logo cursor-pointer" onClick={() => onChangeNav("/")}>
        <Image className="rounded-md" src={logoImage} alt="logo" width={40} height={40} />
      </div>
      <nav className="nav relative flex items-center">
        <Link className="nav-item mr-3" href="/">
          Home
        </Link>
        <Link className="nav-item mr-3" href="/about">
          About
        </Link>

        {session?.user ? (
          <>
            <Image
              className="rounded-[50%] mr-2 cursor-pointer"
              src={session?.user.image ?? defaultAvatar}
              alt="avatar"
              width={40}
              height={40}
              onClick={() => setToggleShowInfo(!toggleShowInfo)}
            />

            {toggleShowInfo && (
              <div className="flex absolute right-[10px] top-[50px] dropdown py-2 px-3 text-[13px] bg-white">
                <div className="flex flex-col items-start normal-case text-black break-normal w-full">
                  <div className="mb-1 cursor-pointer" onClick={() => onChangeNav("/user")}>
                    User: {session?.user.name}
                  </div>
                  <div className="pb-1 cursor-pointer border-b" onClick={() => onChangeNav("/create-prompt")}>
                    Create Prompt
                  </div>
                  <button className="mt-1" onClick={() => handlerLogout()}>
                    Sign out
                  </button>
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
