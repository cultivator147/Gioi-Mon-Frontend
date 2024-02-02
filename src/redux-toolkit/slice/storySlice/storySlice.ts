import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChapterProps } from "../../../app/components/ListChapter";

interface StoryState {
  id: any;
  title?: any;
  chapters: any[];
  description?: any;
}
const initialState: StoryState = { id: 0, title: "All",chapters: []};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    updateStory : (state, action : PayloadAction<StoryState>) => {state.id = action.payload.id; state.chapters = action.payload.chapters},
    addStory : (state) => {state.id += 1},
  },
});
export const {updateStory, addStory} = storySlice.actions;
// export default categorySlice.reducer;
