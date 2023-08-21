import { useEffect, useState } from "react";
import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
import Navbar from "../components/Navbar";
import Flash from "../components/Flash";
import { useLocation } from "react-router-dom";
const Vote = ({ flashMessage, setFlashMessage }) => {
  useEffect(() => {
    return () => {
      if (flashMessage) {
        setFlashMessage(flashMessage);
        flashMessage = {};
      }
    };
  }, []);

  return (
    <>
      <CalendarDisplay />
      <CalendarSelect />
    </>
  );
};

export default Vote;
