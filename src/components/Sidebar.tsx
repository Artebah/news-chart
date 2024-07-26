import React from "react";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
interface SidebarProps {}

const buttonIcons = [MenuIcon, MenuIcon, MenuIcon, MenuIcon];

const Sidebar: React.FC<SidebarProps> = () => {
  const [active, setActive] = React.useState(0);

  const onClick = (i: number) => {
    setActive(i);
  };

  return (
    <aside className="sidebar">
      {buttonIcons.map((Icon, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className={"sidebar-button " + (active === i ? "_active" : "")}>
          <Icon />
        </button>
      ))}
    </aside>
  );
};

export { Sidebar };
