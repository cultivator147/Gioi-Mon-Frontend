import { TypeFilteredListStories } from "../../interfaces/stories";
import request from "./request";

export const getFilteredListStoriesRequest = (params?: TypeFilteredListStories) => {
    return request.get('/filtered-list-story', {params})
}