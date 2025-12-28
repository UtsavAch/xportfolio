import { NavContainer, NavItem } from "./Navbar.Style";

const Navbar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <NavContainer>
      {tabs.map((tab) => (
        <NavItem
          key={tab.id}
          $isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default Navbar;
