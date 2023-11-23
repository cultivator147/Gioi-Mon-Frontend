import { SampleStory, SampleStoryProps } from "./SampleStory";
import styled from "styled-components";
export interface  ListStoriesProps{
    listItems: SampleStoryProps[],
    page?: number,
    size?: number
}
export const ListStoriesGrid = (props: ListStoriesProps) => {
    var items : SampleStoryProps[] = props.listItems;
    const page = props.page || 0;
    const size = props.size || 30;

    if(items.length > 30){
        items = items.slice(page*size,(page+1)*size);
    }
    return(
        <Wrapper>
            {items.map((item : SampleStoryProps) => (
                <SampleStory 
                    image={item.image}
                    title={item.title}
                    href={item.href} 
                    newestChapters={item.newestChapters}                
                />
            ))}
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    width: 70%;
`;
