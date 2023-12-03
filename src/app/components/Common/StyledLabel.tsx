import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
interface StyledLabelProps{
    title : string,
    fontSize?: any,
    color?: string
}
export const StyledLabel = (props : StyledLabelProps) => {
    const title = props.title;
    const fontSize = props.fontSize || StyleConstants.FONT_SIZE_MEDIUM;
    const color = props.color || '#FFFFFF';
    return(
        <Label fontSize={fontSize} color={color}>
            {title}
        </Label>
    );
}
const Label = styled.label<{fontSize : number}>`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
`;
