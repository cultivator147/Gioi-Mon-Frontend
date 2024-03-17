import { useState } from "react";
import { Logger } from "../../../../utils/helper";
interface ImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  onClick?: any;
}
export const StyledImage = (props: ImageProps) => {
  const { src, alt, width, height, onClick } = props;
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <img
      // onError={()=>setImageSrc('https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg')}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
    />
  );
};
