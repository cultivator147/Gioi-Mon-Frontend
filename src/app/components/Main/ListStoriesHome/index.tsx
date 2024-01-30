import { Logger } from "../../../../utils/helper";
import { SampleStory, SimpleStoryProps } from "./StoryHome";
import styled from "styled-components";
export interface  ListStoriesProps{
    listItems: SimpleStoryProps[],
    page?: number,
    size?: number
}
export const ListStoriesGrid = (props: ListStoriesProps) => {
    var items : SimpleStoryProps[] = props.listItems;
    const page = props.page || 0;
    const size = props.size || 30;
    if(items.length > 30){
        items = items.slice(page*size,(page+1)*size);
    }
    return(
        <Wrapper>
            {items.map((item : SimpleStoryProps) => (
                <SampleStory 
                    picture={item.picture}
                    title={item.title}
                    link={item.link} 
                    chapters={item.chapters}                
                />
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
`;
