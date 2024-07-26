import React from "react";
import { ReactComponent as ArrowIcon } from "../assets/icons/arrow.svg";
import { ReactComponent as FolderOpenSvg } from "../assets/icons/group-open.svg";
import { ReactComponent as FolderSvg } from "../assets/icons/group.svg";

interface RequestsButtonsGroupProps {
  name: string;
  children: React.ReactNode;
}

const RequestsButtonsGroup: React.FC<RequestsButtonsGroupProps> = ({
  name,
  children,
}) => {
  const FolderIcon = /*"isActive"*/ false ? FolderOpenSvg : FolderSvg;
  const [isActive, setIsActive] = React.useState(false);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={"group-requests " + (isActive ? "_open" : "")}>
      <button onClick={onClick} className="group-requests-button btn">
        <span className="group-requests-button-arrow">
          <ArrowIcon />
        </span>
        <FolderIcon className="group-requests-button-folder" />
        <span className="group-requests-button-name">{name}</span>
      </button>
      <div className="group-requests-nested-buttons">{children}</div>
    </div>
  );
};

export { RequestsButtonsGroup };
