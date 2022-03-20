/* eslint-disable react/prop-types */
import React from "react";

const useMultiStep = (initial) => {
  const [step, setStep] = React.useState(initial || 0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return { nextStep, prevStep, current: step };
};

// const Multistep = ({ children, initial }) => {
//   const childrens = React.Children.count(children);
//   console.log({ childrens });
//   return <>{children[0]}</>;
// };

export default useMultiStep;
