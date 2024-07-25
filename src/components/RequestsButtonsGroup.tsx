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

  return (
    <div className="group-requests _open">
      <button className="group-requests-button">
        <span className="group-requests-button-arrow">
          <ArrowIcon />
        </span>
        <FolderIcon className="group-requests-button-folder" />
        <span className="group-requests-button-name">{name}</span>
      </button>
      <div>{children}</div>
    </div>
  );
};

export { RequestsButtonsGroup };
