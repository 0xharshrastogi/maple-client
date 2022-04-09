/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

export const useToast = (duration = 500) => {
  const [isActive, setIsActive] = useState(false);
  const ref = React.useRef();

  useEffect(() => {
    if (!isActive) return;

    const timeoutId = setTimeout(() => {
      setIsActive(false);
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive, duration]);

  const show = (message) => {
    if (ref.current) ref.current.querySelector(".toast-body").innerText = message;
    else console.log("ref.current is null");
    // ref.current.querySelector("toast-body") = message;
    setIsActive(true);
    setTimeout(() => setIsActive(false), duration);
  };
  return { isActive, show, ref };
};

// eslint-disable-next-line no-unused-vars
const Toast = React.forwardRef(({ active, varient }, ref) => {
  return (
    <div
      ref={ref}
      className={`toast ${
        active ? "show" : ""
      } fixed bottom-8 right-8 align-items-center text-white bg-${varient} border-0`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{"NO MESSAGE"}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
});

export default Toast;
