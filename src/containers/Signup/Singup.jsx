import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Navbar from '../../components/Navbar/Navbar';

/**
 * Component for User Signup
 * @returns {JSX.Element} Component JSX
 */

const UserSignup = () => {
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

      <section className="mx-8 mt-10">
        <div>
          <h1 className="font-bold text-5xl text-red-600">Get Started</h1>
          <span className="mt-2 inline-block text-gray-400 font-medium">
            Already A Member{' '}
            <Link className="text-red-600 underline" to="/login">
              Log In
            </Link>
          </span>
        </div>

        {/* login with google */}
        <div className="mt-20">
          <Button full onClick={handelUserSignIn}>
            <FontAwesomeIcon icon={faAmericanSignLanguageInterpreting} /> Login With
            Google
          </Button>
        </div>
      </section>
    </>
  );
};

export default UserSignup;
