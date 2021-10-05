import React from 'react';
import girlWithLappyImage from '../../assets/img/GirlWithLappy.svg';
import Navbar from '../../components/Navbar/Navbar';
import './landingSection.css';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Landing Section */}
      <section className="mx-8 sm:w-4/5 sm:mx-auto mt-8 space-y-7 sm:space-y-9 landing sm:grid md:mt-20">
        <h1 className="text-3xl md:text-6xl font-semibold text-center sm:text-left text-gray-400 sm:flex sm:flex-col sm:justify-center">
          <span className="text-gray-600">Schools</span> Are Closed, Learning Is{' '}
          <span className="text-red-600">Open</span>
        </h1>

        {/* image */}

        <div className="flex justify-center image-wrapper">
          <img
            src={girlWithLappyImage}
            alt="Girl With Laptop"
            className="h-40 sm:h-48 md:h-80"
          />
        </div>

        {/* textContent */}

        <p className="text-gray-600 font-medium text-center md:text-left md:text-lg leading-7 md:w-3/4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus porro quos
          voluptates mollitia consectetur? Quaerat suscipit amet saepe ipsa minima,
          possimus a corporis necessitatibus impedit cupiditate, non consequuntur, ex
          libero!
        </p>
      </section>
    </>
  );
};

export default Home;
