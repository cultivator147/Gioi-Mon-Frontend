import { t } from "i18next";
import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
interface StyledLinkProps {
    customStyle?: any;
    title : any;
    href? : string;
    color?: string;
    fontSize?: any;
    afterContent?: string;
    underline ?: boolean;
}
export const StyledLink = (props : StyledLinkProps) => {
    const title = props.title;
    const href = props.href;
    const fontSize = props.fontSize || StyleConstants.FONT_SIZE_MEDIUM;
    const color = props.color || "#ffffff";
    const afterContent = props.afterContent || '';
    const underline = props.underline;
    return (
        <Link 
        fontSize={fontSize}
        underline = {underline}
        color={color} 
        afterContent={afterContent} 
        href={href}>{title} 
        </Link>
    );
}
const Link = styled.a<{color: string, afterContent : string, underline?: any, fontSize?: any}>`
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: 450;
    color: ${props => props.color};
    font-size:  ${props => props.fontSize};
    text-decoration: ${props => (props.underline === true) ? 'underline' : 'none'};
    &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  &::after{
    content: '${props => props.afterContent}' ;
  }
`;