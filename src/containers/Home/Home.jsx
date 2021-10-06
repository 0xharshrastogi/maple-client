import { faBook, faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import girlWithLappyImage from '../../assets/img/GirlWithLappy.svg';
import Cards from '../../components/Cards/Cards';
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

      {/* Section 2 Begins */}

      <section className="mx-8 mt-12 sm:w-4/5 sm:mx-auto introduction">
        {/* title of intro*/}
        <div className="text-center space-y-5 text-gray-500 font-medium">
          <h2 className="text-2xl font-bold text-gray-600">
            <span className="text-red-600">All-In-One</span> Software Solution
          </h2>

          <p>
            It is one of the powerfull online service that combaines the tools needed to
            run a successfull instituion.
          </p>
        </div>

        {/* Cards  */}
        <article className="cards-container mx-auto space-y-14 mt-14 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:gap-y-14 sm:max-w-2xl lg:grid-cols-3 lg:max-w-6xl lg:gap-8 lg:gap-y-20 lg:mt-24">
          <Cards
            title="Easy Attendence Tracking"
            logo={<FontAwesomeIcon color="white" icon={faSchool} />}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
            quisquam doloribus provident accusamus. Minus, natus repellat! Possimus,
            soluta.
          </Cards>
          <Cards
            title="Easy Attendence Tracking"
            logo={<FontAwesomeIcon color="white" icon={faBook} />}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
            quisquam doloribus provident accusamus. Minus, natus repellat! Possimus,
            soluta.
          </Cards>
          <Cards
            title="Easy Attendence Tracking"
            logo={<FontAwesomeIcon color="white" icon={faBook} />}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
            quisquam doloribus provident accusamus. Minus, natus repellat! Possimus,
            soluta.
          </Cards>
          <Cards
            title="Easy Attendence Tracking"
            logo={<FontAwesomeIcon color="white" icon={faBook} />}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
            quisquam doloribus provident accusamus. Minus, natus repellat! Possimus,
            soluta.
          </Cards>
          <Cards
            title="Easy Attendence Tracking"
            logo={<FontAwesomeIcon color="white" icon={faBook} />}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
            quisquam doloribus provident accusamus. Minus, natus repellat! Possimus,
            soluta.
          </Cards>
          <Cards
            title="Easy Attendence Tracking"
            logo={<FontAwesomeIcon color="white" icon={faBook} />}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
            quisquam doloribus provident accusamus. Minus, natus repellat! Possimus,
            soluta.
          </Cards>
        </article>
      </section>
    </>
  );
};

export default Home;
