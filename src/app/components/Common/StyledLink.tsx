import { t } from "i18next";
import styled from "styled-components";
interface StyledLinkProps {
    title : any;
    href? : string;
    color?: string;
    afterContent?: string;
    underline ?: boolean;
}
export const StyledLink = (props : StyledLinkProps) => {
    const title = props.title;
    const href = props.href;
    const color = props.color || "#ffffff";
    const afterContent = props.afterContent || '';
    const underline = props.underline;
    return (
        <Link 
        underline = {underline}
        color={color} 
        afterContent={afterContent} 
        href={href}>{title} 
        </Link>
    );
}
const Link = styled.a<{color: string, afterContent : string, underline?: boolean}>`
    color: ${props => props.color};
    font-size: 1rem;
    text-decoration: ${props => (props.underline === true) ? 'underline' : 'none'};
    &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  &::after{
    content: '${props => props.afterContent}' ;
  }
`;