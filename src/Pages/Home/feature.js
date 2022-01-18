import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ListItem } from "../../components";

export const Feature = () => {
  return (
    <section className="mt-14 mx-8 md:mt-24 sm:w-4/5 sm:mx-auto feature">
      <div className="text-center space-y-5 text-gray-500 font-medium">
        <h2 className="text-2xl font-bold text-gray-600">
          <span className="text-red-600">Our</span> Features
        </h2>

        <p className="">
          This is very extraordinary feature that makes learing activities more effiecient
        </p>
      </div>

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
