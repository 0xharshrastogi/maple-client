import { faBook, faSchool } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Cards } from "../../components";

export const Introduction = () => {
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
