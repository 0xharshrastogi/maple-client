import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import UserCreatedClassrooms from "./UserCreatedClassrooms";
import UserJoinedClassrooms from "./UserJoinedClassroom";

const ManageAccount = () => {
  const route = useRouteMatch();
  const userId = useSelector((store) => store?.user?.id);

  return (
    <section>
      <nav className="mx-10 px-4 flex justify-between border-2 ">
        <Link to={`${route.path}/myclassrooms`}>My Classrooms</Link>
        <Link to={`${route.path}/joinedclassrooms`}>Joined Classrooms</Link>
      </nav>

      <section className="mx-10 px-4">
        <Switch>
          <Route path={`${route.path}/myclassrooms`}>
            {userId && <UserCreatedClassrooms userId={userId} />}
          </Route>

          <Route path={`${route.path}/joinedclassrooms`}>
            {userId && <UserJoinedClassrooms userId={userId} />}
          </Route>
        </Switch>
      </section>
    </section>
  );
};

export default ManageAccount;
