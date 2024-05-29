import { TypeFilteredListStories, TypeSearch, TypeTopStories } from "../api/interfaces/listStories";
import { getFilteredListStoriesRequest, getTopStories, searchRequest } from "../api/modules/stories/listStories";
import { Logger } from "../utils/helper";

export interface IUseFilteredListStories {
    onComplete : (response : any, totalPages: any) => any;
    categoryId?: any;
    writingState?: any;
    keyword?: string;
    sortBy?: any;
    page?: number;
    size?: number;
    leaderboardType?: string;
}
const useFilteredListStories = (props : IUseFilteredListStories) => {
    const {onComplete, categoryId, writingState,keyword, sortBy, page, size, leaderboardType} = props;
    const getFilteredListStories = async () => {
        try{
            const params : TypeFilteredListStories = {category_id: categoryId, writing_state: writingState,keyword:keyword,  sort_by : sortBy, page: page, size: size};
            const response = await getFilteredListStoriesRequest(params);
            Logger('api data: ', response?.data?.data);
            const data = response?.data?.data;
            onComplete(data?.content, data.totalPages);
        }catch(err){
            Logger('err call api: ', err);
        }
    };
    const getLeaderboardStory = async () => {
        try{
            const params : TypeTopStories = {type: leaderboardType};
            const response = await getTopStories(params);
            Logger('api data: ', response?.data?.data);
            onComplete(response?.data?.data, 1);
        }catch(err){
            Logger('err call api: ', err);
        }
    };
    return {getFilteredListStories, getLeaderboardStory};
}
export default useFilteredListStories;