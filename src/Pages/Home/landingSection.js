import React from "react";
import girlWithLappyImage from "../../assets/img/GirlWithLappy.svg";

export const LandingSection = () => {
  return (
    <section className="mx-8 sm:w-4/5 sm:mx-auto mt-8 space-y-7 sm:space-y-9 landing sm:grid md:mt-20">
      <h1 className="text-3xl md:text-6xl font-semibold  sm:text-left text-gray-400 sm:flex sm:flex-col sm:justify-center">
        <span className="text-gray-600">Schools</span> Are Closed, Learning Is
        <span className="text-uiBlue font-TTNorms">Open</span>
      </h1>

      {/* image */}

      <div className="flex justify-center image-wrapper">
        <img src={girlWithLappyImage} alt="Girl With Laptop" className="h-40 sm:h-48 md:h-80" />
      </div>

      {/* textContent */}

      <p className="text-gray-600 font-medium  md:text-left md:text-lg leading-7 md:w-3/4">
        Gone are the days when simple training sessions required physical presence from both the
        learners and the tutors at common ground. Step into the future where all the involved
        parties are actively participating in online classrooms, events and courses regardless of
        their physical location. It is the era of e-learning and online teaching platforms.
      </p>
    </section>
  );
};
