import { TypeFilteredListStories } from "../api/interfaces/listStories";
import { getFilteredListStoriesRequest } from "../api/modules/stories/listStories";
import { Logger } from "../utils/helper";

export interface IUseFilteredListStories {
    onComplete : (response : any) => any;
    categoryId?: any;
    writingState?: any;
}
const useFilteredListStories = (props : IUseFilteredListStories) => {
    const {onComplete, categoryId, writingState} = props;
    const getFilteredListStories = async () => {
        try{
            const params : TypeFilteredListStories = {category_id: categoryId, writing_state: writingState};
            const response = await getFilteredListStoriesRequest(params);
            Logger('api data: ', response?.data?.data?.content);
            onComplete(response?.data?.data?.content);
        }catch(err){
            Logger('err call api: ', err);
        }
    }
    return {getFilteredListStories};
}
export default useFilteredListStories;