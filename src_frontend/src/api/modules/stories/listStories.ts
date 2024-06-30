import { TypeFilteredListStories, TypeReadingStory, TypeSearch, TypeTopStories } from "../../interfaces/listStories";
import request, { getAuthApi } from "./request";

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
    return request.get('/leaderboard', {params: params});   
}
export const searchRequest = (params?: TypeSearch) => {
    return request.get('/search', {params: params});
}
export const getReadingStories = (token: string, params: TypeReadingStory) => {
    return getAuthApi('/reading-story', token, {params: params});
}