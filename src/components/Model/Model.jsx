import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Portal from "../Portal/Portal";

const Model = ({ onClose, children, backgroundStylesClasses, modelStyleClasses }) => {
  useEffect(() => {
    const onClickHandler = (e) => onClose(e);
    const onKeyPressHandler = (e) => e.code === "Escape" && onClose(e);

    document.body.style.overflow = "hidden";

    window.addEventListener("click", onClickHandler);
    window.addEventListener("keydown", onKeyPressHandler);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("click", onClickHandler);
      window.removeEventListener("keydown", onKeyPressHandler);
    };
  }, [onClose]);

  return (
    <Portal>
      <section
        className={`"modal-wrapper fixed inset-0 grid place-items-center ${
          backgroundStylesClasses || "'shadow-sm'"
        }"`}
      >
        <div
          className={`modal-contant w-4/5 mx-auto p-3 rounded-md bg-gray-700 text-white sm:w-auto ${modelStyleClasses}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </section>
    </Portal>
  );
};

Model.propTypes = {
  backgroundStylesClasses: PropTypes.string,
  modelStyleClasses: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default Model;
