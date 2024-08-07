import { Flex, TextInput } from "@mantine/core";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { StyledButton } from "../Common/Button/StyledButton";
import useFilteredListStories, {
  IUseFilteredListStories,
} from "../../../hooks/useFilteredListStories";
import { SimpleStoryProps } from "../Main/ListStoriesHome/StoryHome";
import { ChooseButton } from "../Common/Button/ChooseButton";
import { SelectButton } from "../Common/Button/SelectButton";
import { SearchButton } from "../Common/Button/SearchButton";

const SelectStoryModal = ({ isShowing, hide, onCompleteSelectStory }: any) => {
  const [keyword, setKeyword] = useState("A");
  const inputContent = useRef(null);
  const [stories, setStories] = useState<SimpleStoryProps[]>([]);
  const [selectedStory, setSelectedStory] = useState<SimpleStoryProps>();

  const handleRadioChange = (str: SimpleStoryProps) => {
    setSelectedStory(str);
  };
  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data);
  };
  const onClickSearch = async () => {
    getFilteredListStories();
  };
  const filtered: IUseFilteredListStories = {
    onComplete: onConpleteGetFilteredListStories,
    // categoryId: categoryId,
    // writingState: parseInt(writingState),
    keyword: keyword,
    // sortBy: sortBy,
    // page: currentPage,
    // size: +StyleConstants.ITEMS_PER_PAGE,
  };
  const { getFilteredListStories } = useFilteredListStories(filtered);
  React.useEffect(() => {
    getFilteredListStories();
  }, [keyword]);
  return isShowing ? (
    <Flex
      style={{
        position: "fixed",
        zIndex: 99,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        left: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          height: "80%",
          background: "white",
          borderRadius: "9px",
          border: "solid white",
        }}
      >
        <Flex direction={"column"} style={{ height: "88%" }}>
          <Flex style={{ padding: "8px", justifyContent: "center" }}>
            <StyledLabel title={"Chọn truyện"} color="#0" />
          </Flex>
          <Flex
            direction={"column"}
            style={{
              padding: "12px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              onChange={(event) => setKeyword(event.currentTarget.value)}
              ref={inputContent}
              style={{ width: "100%" }}
              placeholder="Nhập từ khóa (tên truyện, tác giả...)"
            />
            <SearchButton onClick={onClickSearch}>{"Tìm kiếm"}</SearchButton>
          </Flex>
          <div
            style={{
              width: "100%",
              opacity: "70%",
              height: "1px",
              backgroundColor: "grey",
            }}
          />
          <Flex style={{ padding: "12px", overflowY: "scroll" }}>
            <table
              border={1}
              width={"100%"}
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                {stories.map((str) => (
                  <tr>
                    <td
                      style={{
                        width: "156px",
                        height: "128px",
                        padding: "8px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <StyledImage src={str?.picture} />
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      <Flex direction={"column"}>
                        <StyledLabel
                          title={`Tên truyện: ${str?.title}`}
                          fontSize={"1.2rem"}
                          color="#000000"
                        />
                        <StyledLabel
                          title={"Tác giả: "}
                          fontSize={"1.2rem"}
                          color="#000000"
                        />
                        <StyledLabel
                          title={"Lượt xem: "}
                          fontSize={"1.2rem"}
                          color="#000000"
                        />
                      </Flex>
                    </td>
                    <td
                      style={{
                        width: "10%",
                        padding: "8px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <Flex style={{ padding: "4px", gap: "2px" }}>
                        <StyledLabel
                          title="Chọn"
                          fontSize={"1.2rem"}
                          color="#000000"
                        />
                        <input
                          type="radio"
                          name="selectGroup"
                          onChange={() => {
                            handleRadioChange(str);
                          }}
                        />
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Flex>
        </Flex>
        <Flex
          align={"center"}
          justify={"center"}
          style={{
            zIndex: 99,
            width: "100%",
            borderTop: "1px solid #e5e5e5",
            padding: "16px",
          }}
        >
          <button
            className="btn-choose"
            onClick={() => {
              hide();
              onCompleteSelectStory(selectedStory);
            }}
          >
            {"Chọn"}
          </button>
          <button className="btn-closed" onClick={hide}>
            {"Đóng"}
          </button>
        </Flex>
      </div>
    </Flex>
  ) : null;
};

export default SelectStoryModal;
