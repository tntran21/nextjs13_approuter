"use client";

import Image from "next/image";
import React from "react";

const notFoundIamge = require("@/assets/images/404.jpg");

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Image className="max-w-full max-h-[calc(100vh-80px)]" src={notFoundIamge} alt="404" />
    </div>
  );
};

export default NotFoundPage;
