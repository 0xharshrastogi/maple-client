import { faAmericanSignLanguageInterpreting } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import GirlWithBookImage from "../../assets/img/GirlWithBookBook.svg";
import { Button } from "../../components";
import { useAuth } from "../../hooks";

/**
 * Component for User Signup
 * @returns {JSX.Element} Component JSX
 */

export const Signup = () => {
  const { signin } = useAuth();
  const history = useHistory();

  const handelUserSignIn = useCallback(async () => {
    try {
      await signin();
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  }, [history, signin]); // !!Note removed isSingedIn from deps if error occured fix this and uncomment the line: 15

  return (
    <>
      {/* <Navbar logo /> */}

      <section className="mx-auto mt-16 sm:flex md:mx-auto md:w-4/5">
        {/* sign up image */}
        <div className="image-wrapper flex justify-center">
          <img
            src={GirlWithBookImage}
            alt="GirlWithBookImage"
            className="w-10/12 sm:w-auto"
          />
        </div>

        {/* signup details */}
        <section className="mx-8 mt-10 md:flex md:flex-col md:justify-center md:ml-auto">
          <div className="">
            <h1 className="font-bold text-5xl text-red-600 md:text-6xl lg:text-8xl">
              Get Started
            </h1>
            <span className="mt-2 inline-block text-gray-400 font-medium">
              Already A Member{" "}
              <Link className="text-red-600 underline" to="/login">
                Log In
              </Link>
            </span>
          </div>

          {/* login with google */}
          <div className="mt-10 max-w-xs">
            <Button full onClick={handelUserSignIn}>
              <FontAwesomeIcon icon={faAmericanSignLanguageInterpreting} /> Login With
              Google
            </Button>
          </div>
        </section>
      </section>
    </>
  );
};
