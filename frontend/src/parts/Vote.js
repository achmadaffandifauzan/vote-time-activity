import { useEffect, useState } from "react";
import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
const Vote = ({ flashMessage, setFlashMessage }) => {
  return (
    <>
      <CalendarDisplay />
      <CalendarSelect />
    </>
  );
};

export default Vote;
