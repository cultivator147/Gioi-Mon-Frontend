import { TypeFilteredListStories, TypeTopStories } from "../../interfaces/listStories";
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
export const getTopStories = (params: TypeTopStories) => {
    return request.get('/top-stories', {params: params});   
}