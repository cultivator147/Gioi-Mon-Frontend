import { useState } from "react";
import { Logger } from "../../../../utils/helper";
interface ImageProps {
  src: string;
  alt?: string;
  width?: any;
  height?: any;
  onClick? : () => any;
}
export const StyledImage = (props: ImageProps) => {
  const { src, alt,  onClick } = props;
  const width = props.width || '100%';
  const height = props.height || '100%';
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <img
      // onError={()=>setImageSrc('https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg')}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      style={{cursor: 'pointer'}}
    />
  );
};
