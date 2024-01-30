import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { Button } from "../../../stories/Button";
interface StyledButtonProps{
    label: string,
    backgroundColor? : string,
    onClick?: () => void,
    customStyle?: any,
    href ?: any,
}
export const StyledButton = ({href, label, backgroundColor ='#000000',customStyle, ...props}: StyledButtonProps) => {
    return(
        <a href={href}>
        <button
        style={{minWidth: '4em',borderStyle: 'solid', borderColor: 'gray',borderRadius: '8px',padding: '6px',backgroundColor, cursor: "pointer", ...customStyle}}
        {...props}
        >
            {label}
        </button>
        </a>
    );
}
const Label = styled.label<{fontSize : number}>`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
`;
