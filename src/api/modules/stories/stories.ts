import { TypeFilteredListStories } from "../../interfaces/stories";
import request from "./request";

export const getFilteredListStoriesRequest = (params?: TypeFilteredListStories) => {
    return request.get('/filtered-list-story', {params: params});
}
export const getSuggestedListStoriesRequest = () => {
    return request.get('/suggested-list-stories');
}
export const getReadingHistory = () => {
    return request.get('/reading-history');
}