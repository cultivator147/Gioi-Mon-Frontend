import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { Button } from "../../../stories/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom";
interface StyledNavButtonProps {
  label: string;
  backgroundColor?: string;
  onClick?: () => void;
  customStyle?: any;
  href?: string;
  disable?: boolean;
  navigate?: boolean
}
export const StyledNavButton = ({
  onClick,
  disable,
  href,
  label,
  backgroundColor = "#000000",
  customStyle,
  ...props
}: StyledNavButtonProps) => {
  const [background, setBackground] = useState(backgroundColor);
  return (
    <NavLink to={href ? href : "/"}>
      <button
        // setBackground("#d6935b")
        disabled={disable}
        onClick={onClick}
        style={{
          minWidth: "4em",
          borderStyle: "solid",
          borderColor: "gray",
          borderRadius: "8px",
          padding: "6px",
          backgroundColor: background,
          cursor: "pointer",
          ...customStyle,
        }}
        {...props}
      >
        {label}
      </button>
    </NavLink>
  );
};
const Label = styled.label<{ fontSize: number }>`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
`;
