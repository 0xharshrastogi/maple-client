import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { UserJoinedClassrooms } from "./JoinedClassroom";
import { UserClassrooms } from "./MyClassrooms";
import { TabBar } from "./tabBar";

export const ManageAccount = () => {
  const route = useRouteMatch();
  const userId = useSelector((store) => {
    return store.user.data.id;
  });

  const tabsData = useMemo(() => {
    return [
      { path: `/manage/myclassrooms`, name: "My Classroom" },
      { path: `/manage/joinedclassrooms`, name: "Joined Classroom" },
    ];
  }, []);

  return (
    <section className="mt-9">
      <TabBar tabs={tabsData} />

      <section className="mx-10 px-4">
        <Switch>
          <Route exact path={`${route.path}/myclassrooms`}>
            <UserClassrooms userId={userId} />
          </Route>

          <Route exact path={`${route.path}/joinedclassrooms`}>
            <UserJoinedClassrooms userId={userId} />
          </Route>
        </Switch>
      </section>
    </section>
  );
};
