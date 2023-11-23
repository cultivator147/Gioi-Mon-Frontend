import { useEffect, useRef } from "react";
import styled from "styled-components";

export const ListStoriesTransition = () => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemWidth = 150;
  const numItems = 8;
  const totalWidth = itemWidth * numItems;

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
    <List ref={listRef}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </List>
  );
};

const Item = () => {
  const Image = styled.img`
    width: 180px;
  `;
  const ItemWrapper = styled.div`
    padding: 10px;
    transition: transform 0.3s ease;
  `;
  return (
    <ItemWrapper>
      <Image
        src="//st.nettruyenus.com/data/comics/188/dai-quan-gia-la-ma-hoang-904.jpg"
        alt="brand-img"
      />
    </ItemWrapper>
  );
};

const List = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;
