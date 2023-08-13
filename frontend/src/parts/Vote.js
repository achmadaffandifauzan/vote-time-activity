import CalendarSelect from "./CalendarSelect";
import CalendarDisplay from "./CalendarDisplay";
import Navbar from "../components/Navbar";
const Vote = () => {
  return (
    <div className="mainPage">
      <Navbar />
      <div className="container-xxl">
        <CalendarDisplay />
        <CalendarSelect />
      </div>
    </div>
  );
};

export default Vote;
