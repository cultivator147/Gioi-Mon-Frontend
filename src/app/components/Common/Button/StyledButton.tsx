import styled from "styled-components";
import { StyleConstants } from "../../../../styles/StyleConstants";
import { Button } from "../../../../stories/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom";
interface StyledButtonProps {
  label: string;
  backgroundColor?: string;
  onClick?: () => void;
  customStyle?: any;
  href?: string;
  disable?: boolean;
  navigate?: boolean
}
export const StyledButton = ({
  onClick,
  disable,
  href,
  label,
  backgroundColor = "#000000",
  customStyle,
  ...props
}: StyledButtonProps) => {
  const [background, setBackground] = useState(backgroundColor);
  return (
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
  );
};
const Label = styled.label<{ fontSize: number }>`
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
`;
