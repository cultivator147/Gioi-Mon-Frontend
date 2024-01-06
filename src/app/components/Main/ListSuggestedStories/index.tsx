import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getSuggestedListStoriesRequest } from "../../../../api/modules/stories/stories";
import { StyledImage } from "../../Common/Image";
import { SuggestedStory, SuggestedStoryProps } from "./SuggestedStory";

export interface ListSize{
  width: any;
  height: any;
}
export const ListSuggestedStories = () => {
  const [stories, setStories] = useState([]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemWidth = 180;
  const numItems = 5;
  const totalWidth = itemWidth * numItems;

  useEffect(() => {
    const getAll = async () => {
      const response = await getSuggestedListStoriesRequest();
      setStories(response?.data?.data);
    };
    getAll();
  },[]
  )
  useEffect(() => {
    let requestId: number;
    let scrollPosition = 0;

    const scrollList = () => {
      scrollPosition += 1;
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
        if (listRef.current) {
          listRef.current.scrollLeft = 0;
        }
      } else {
        if (listRef.current) {
          listRef.current.scrollLeft = totalWidth - scrollPosition;
        }
      }
      requestId = requestAnimationFrame(scrollList);
    };

    requestId = requestAnimationFrame(scrollList);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <List
     ref={listRef}>
      {stories.map((story : SuggestedStoryProps) => (
        <SuggestedStory
        picture={story.picture}
        title={story.title}
        link={story.link}
        />
      ))}
    </List>
  );
};


const List = styled.div`
  max-width: 1080px;
  display: flex;
  overflow: hidden;
`;
