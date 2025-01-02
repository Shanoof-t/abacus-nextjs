import Image from "next/image";
import React from "react";

const HeaderLogo = () => {
  return (
    <div className="items-center hidden lg:flex">
      <Image src="./logo.svg" width={28} height={28} alt="logo" />
      <span className="ms-2.5 text-2xl font-semibold text-white">Abacus</span>
    </div>
  );
};

export default HeaderLogo;
