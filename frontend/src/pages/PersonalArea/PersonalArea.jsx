// src/pages/PersonalArea/PersonalArea.jsx
import PersonalInfoComponent from "../../components/sections/PersonalInfoComponent/PersonalInfoComponent";
import MessageDisplayComponent from "../../components/sections/MessageDisplayComponent/MessageDisplayComponent";

const PersonalArea = () => {
  return (
    <div>
      <PersonalInfoComponent />
      <MessageDisplayComponent />
    </div>
  );
};

export default PersonalArea;
