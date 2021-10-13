import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import GirlWithBookImage from '../../assets/img/GirlWithBookBook.svg';
import Button from '../../components/Button/Button';
import Navbar from '../../components/Navbar/Navbar';

/**
 * Component for User Login
 * @returns {JSX.Element} Component JSX
 */

const UserLogin = () => {
  const isSignedIn = useSelector((store) => store.isSignedIn);
  const history = useHistory();

  const handelUserSignIn = useCallback(async () => {
    try {
      // eslint-disable-next-line no-undef
      const GoogleAuth = gapi.auth2.getAuthInstance();
      await GoogleAuth.signIn();
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  }, [isSignedIn]);

  return (
    <>
      <Navbar logo />

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
              Welcome
            </h1>
            <span className="mt-2 inline-block text-gray-400 font-medium">
              New Member?{' '}
              <Link className="text-red-600 underline" to="/signup">
                Sign Up
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

export default UserLogin;
