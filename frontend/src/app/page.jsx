"use client";
import React from "react";



const LandingPage = () => {
  return (
    <div
      className=" h-[calc(100vh-68px)]  bg-gray-900  flex items-center justify-center text-white fixed w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 10, 35, 0.75), rgba(5, 10, 35, 0.75)), url(https://www.frost.com/wp-content/uploads/2022/02/Supply_Chain.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
      }}
    >
      <div className="container text-center pt-25 ">
        <h2 className="text-[20px] lg:text-[3rem] text-white mb-0 lg:mb-[10px]">Welcome To</h2>
        <h1 className="font-semibold text-[35px] lg:text-7xl">Eco Supply</h1>
        <p className="text-[15px] lg:text-[20px] mt-4 text-white">
        In today&apos;s complex global marketplaces, trust is paramount. Our Supply Chain Management Smart Contracts offer unparalleled transparency, enabling all stakeholders—manufacturers, suppliers, vendors, and customers—to see exactly where their products are at any given moment. From the factory floor to the final sale, every movement is recorded on the blockchain, providing a clear, immutable trail of goods. This level of visibility not only boosts confidence but also helps mitigate risks associated with fraud and counterfeiting.
        </p>

       
      </div>
    </div>
  );
};

export default LandingPage;