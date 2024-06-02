import { Avatar } from "@mantine/core";
interface AvatarProps {
    src: string;
    alt?: string;
    width?: any;
    height?: any;
    onClick? : () => any;
  }
export const StyledAvatar = (props: AvatarProps) => {
    const {src, alt, width, height, onClick} = props;
    return(
        <Avatar onClick={onClick} alt={alt} src={src} radius={99} style={{width: width, height: height, cursor: 'pointer'}}/>
    );
}
export const MantineImage = (props: AvatarProps) => {
    const {src, alt, width, height, onClick} = props;
    return(
        <Avatar onClick={onClick} alt={alt} src={src} radius={5} style={{width: width, height: height, cursor: 'pointer'}}/>
    );
}