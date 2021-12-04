import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../api/createUser';
import Button from '../../components/Button/Button';
import { userActionType } from '../../reducers/user';

const RadioField = ({ label, ...rest }) => {
  return (
    <div className="space-x-1">
      <input type="radio" {...rest} />
      <span>{label}</span>
    </div>
  );
};

RadioField.propTypes = {
  rest: PropTypes.object,
  label: PropTypes.string.isRequired,
};

const Role = () => {
  const user = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState(() => user.role);
  const dispatch = useDispatch();

  return (
    <form
      className={`mx-auto max-w-md mt-10 p-6 border bottom-1 rounded ${
        user.role ? 'hidden' : ''
      }`}
    >
      <div className="mb-6">
        <label className="text-xl mb-3 inline-block" htmlFor="role">
          Who You Are?
        </label>

        <div className="flex space-x-4">
          <RadioField
            name="userrole"
            label="Student"
            onChange={() => setUserRole('STUDENT')}
          />
          <RadioField
            name="userrole"
            label="Teacher"
            onChange={() => setUserRole('TEACHER')}
          />
        </div>
      </div>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          if (!userRole) console.error('User Role Not Selected');

          userRole &&
            updateUser(user.userId, { role: userRole })
              .then((result) => {
                if (!result) return Promise.reject('Update Failed');

                dispatch({
                  type: userActionType.addUserRole,
                  payload: { role: userRole },
                });
              })
              .catch(() => console.log('Updating User Role Failed'));
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default Role;
