import React, { useMemo } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Greeting } from "./Greeting";
import { UserJoinedClassrooms } from "./JoinedClassroom";
import { UserClassrooms } from "./MyClassrooms";
import { TabBar } from "./tabBar";

export const ManageAccount = () => {
  const route = useRouteMatch();
  const {
    user: { userID, firstname },
  } = useAuth();

  const tabsData = useMemo(() => {
    return [
      { path: `/manage/myclassrooms`, name: "My Classroom" },
      { path: `/manage/joinedclassrooms`, name: "Joined Classroom" },
    ];
  }, []);

  return (
    <section className="">
      <Greeting name={firstname} messgage="Welcome To Mapple Dashboard." />
      <TabBar tabs={tabsData} />

      <section className="mx-10 px-4">
        <Switch>
          <Route exact path={`${route.path}/myclassrooms`}>
            <UserClassrooms userID={userID} />
          </Route>

          <Route exact path={`${route.path}/joinedclassrooms`}>
            <UserJoinedClassrooms userID={userID} />
          </Route>
        </Switch>
      </section>
    </section>
  );
};
