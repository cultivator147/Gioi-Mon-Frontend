import request from "./request";

export const getDetailStory = (params: {story_id: number}) => {
    return request.get('/story/detail', {params: params});   
}
export const getStoryContent = (params: {story_id: number, chapter_number: number}) => {
    return request.get('/story/content', {params: params});   
}