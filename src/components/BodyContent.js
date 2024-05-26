import React from "react";
import {
  FaApple,
  FaGoogle,
  FaMicrosoft,
  FaSpotify,
  FaAmazon,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BodyContent = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/courses");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md text-left">
        <p className="text-4xl font-bold">Learn To Code - For Free</p>
        <p className="my-4 text-4xl font-bold">Build Porjects.</p>
        <p className="my-4 text-4xl font-bold">Earn certifications.</p>
        <p className="text-sm my-4">
          Since 2014, more than 40,000 students freeCodeCamp.org graduates have
          gotten jobs at tech companies including:
        </p>
        <div className="flex justify-start items-center my-4">
          <FaApple className="text-4xl mx-4" />
          <FaGoogle className="text-4xl mx-4" />
          <FaMicrosoft className="text-4xl mx-4" />
          <FaSpotify className="text-4xl mx-4" />
          <FaAmazon className="text-4xl mx-4" />
        </div>
        <button
          className="bg-yellow-500 text-black py-3 px-6 rounded"
          onClick={handleGetStartedClick}
        >
          Get Started (It's Free)
        </button>
      </div>
    </div>
  );
};

export default BodyContent;
