import { TypeFilteredListStories, TypeTopStories } from "../../interfaces/listStories";
import request from "./request";

export const getAllCategories = () => {
    return request.get('/category');
}