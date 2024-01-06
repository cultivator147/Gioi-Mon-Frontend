import { useState } from "react";
import { Logger } from "../../../../utils/helper";
interface ImageProps{
    src : string,
    alt?: string,
    width: number,
    height: number,
    onClick?:any,
}
export const StyledImage = (props: ImageProps) => {
    const{src, alt, width, height, onClick} = props;
    const [imageSrc, setImageSrc] = useState(src);
    return(
        <img
            onError={()=>setImageSrc('https://st.nettruyenus.com/data/comics/24/ta-co-999-loai-di-nang.jpg')}
            src= {imageSrc}
            alt = {alt}
            width={width}
            height={height}
            onClick={onClick}
        />
    );

}