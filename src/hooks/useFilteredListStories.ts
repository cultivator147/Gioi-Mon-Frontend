import { TypeFilteredListStories, TypeSearch } from "../api/interfaces/listStories";
import { getFilteredListStoriesRequest, searchRequest } from "../api/modules/stories/listStories";
import { Logger } from "../utils/helper";

export interface IUseFilteredListStories {
    onComplete : (response : any) => any;
    categoryId?: any;
    writingState?: any;
    keyword?: string;
    sortBy?: any;
    page?: number;
    size?: number;
}
const useFilteredListStories = (props : IUseFilteredListStories) => {
    const {onComplete, categoryId, writingState,keyword, sortBy, page, size} = props;
    const getFilteredListStories = async () => {
        try{
            const params : TypeFilteredListStories = {category_id: categoryId, writing_state: writingState,keyword:keyword,  sort_by : sortBy, page: page, size: size};
            const response = await getFilteredListStoriesRequest(params);
            Logger('api data: ', response?.data?.data);
            onComplete(response?.data?.data);
        }catch(err){
            Logger('err call api: ', err);
        }
    };
   
    return {getFilteredListStories};
}
export default useFilteredListStories;