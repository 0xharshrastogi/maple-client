import { faAtom, faBook, faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import girlWithLappyImage from '../../assets/img/GirlWithLappy.svg';
import Cards from '../../components/Cards/Cards';
import Footer from '../../components/Footer/Footer';
import ListItem from '../../components/ListItem/ListItem';
import './landingSection.css';

const Feature = () => {
  return (
    <section className="mt-14 mx-8 md:mt-24 sm:w-4/5 sm:mx-auto feature">
      {/* header */}
      <div className="text-center space-y-5 text-gray-500 font-medium">
        <h2 className="text-2xl font-bold text-gray-600">
          <span className="text-red-600">Our</span> Features
        </h2>

        <p className="">
          This is very extraordinary feature that makes learing activities more effiecient
        </p>
      </div>

      {/* points */}
      <div className="space-y-40 mt-24">
        <article className="mx-auto flex flex-col md:flex-row md:justify-between md:gap-12 md:max-w-6xl">
          <div className="overflow-hidden rounded-xl mx-auto shadow-md max-w-sm image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1518349619113-03114f06ac3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="feature image"
            />
          </div>
          <div className="mt-6 space-y-5 md:space-y-10 feature-data md:mt-0">
            <h3 className="text-2xl font-bold text-gray-600">
              A <span className="text-red-600">automated</span> attendence
            </h3>
            <ul className="space-y-4 md:ml-6">
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, rem!
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
                voluptatum!
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
            </ul>
          </div>
        </article>
        <article className="mx-auto flex flex-col md:flex-row md:justify-between md:gap-12 md:max-w-6xl">
          <div className="mt-6 space-y-5 md:space-y-10 feature-data md:mt-0">
            <h3 className="text-2xl font-bold text-gray-600">
              A <span className="text-red-600">user interface</span> designed for
              classroom.
            </h3>
            <ul className="space-y-4 md:ml-6">
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, rem!
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
                voluptatum!
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
              <ListItem icon={<FontAwesomeIcon color="white" icon={faAtom} />}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quos?
              </ListItem>
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl mx-auto shadow-md max-w-sm image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80"
              alt="feature image"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

const Introduction = () => {
  return (
    <section className="mx-8 mt-12 md:mt-24 sm:w-4/5 sm:mx-auto introduction">
      {/* title of intro*/}
      <div className="text-center space-y-5 text-gray-500 font-medium">
        <h2 className="text-2xl font-bold text-gray-600">
          <span className="text-red-600">All-In-One</span> Software Solution
        </h2>

        <p>
          It is one of the powerfull online service that combaines the tools needed to run
          a successfull instituion.
        </p>
      </div>
      {/* Cards  */}
      <article className="cards-container mx-auto space-y-14 mt-14 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:gap-y-14 sm:max-w-2xl lg:grid-cols-3 lg:max-w-6xl lg:gap-8 lg:gap-y-20 lg:mt-24">
        <Cards
          title="Easy Attendence Tracking"
          logo={<FontAwesomeIcon color="white" icon={faSchool} />}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
          quisquam doloribus provident accusamus. Minus, natus repellat! Possimus, soluta.
        </Cards>
        <Cards
          title="Easy Attendence Tracking"
          logo={<FontAwesomeIcon color="white" icon={faBook} />}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
          quisquam doloribus provident accusamus. Minus, natus repellat! Possimus, soluta.
        </Cards>
        <Cards
          title="Easy Attendence Tracking"
          logo={<FontAwesomeIcon color="white" icon={faBook} />}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis magni fuga
          quisquam doloribus provident accusamus. Minus, natus repellat! Possimus, soluta.
        </Cards>
      </article>
    </section>
  );
};

const LandingSection = () => {
  return (
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
        voluptates mollitia consectetur? Quaerat suscipit amet saepe ipsa minima, possimus
        a corporis necessitatibus impedit cupiditate, non consequuntur, ex libero!
      </p>
    </section>
  );
};

const Home = () => {
  return (
    <>
      {/* Landing Section */}
      <LandingSection />

      {/* Section 2 Begins */}
      <Introduction />

      {/* ?section 3 Features */}
      <Feature />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
