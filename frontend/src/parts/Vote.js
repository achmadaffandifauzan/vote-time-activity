import { useEffect, useState } from "react";
import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
const Vote = ({ flashMessage, setFlashMessage }) => {
  return (
    <>
      <CalendarDisplay
        flashMessage={flashMessage}
        setFlashMessage={setFlashMessage}
      />
      <CalendarSelect
        flashMessage={flashMessage}
        setFlashMessage={setFlashMessage}
      />
    </>
  );
};

export default Vote;
