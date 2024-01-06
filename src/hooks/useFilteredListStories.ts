import { TypeFilteredListStories } from "../api/interfaces/stories";
import { getFilteredListStoriesRequest } from "../api/modules/stories/stories";
import { Logger } from "../utils/helper";

export interface IUseFilteredListStories {
    onComplete : (response : any) => any;
    categoryId: any;
}
const useFilteredListStories = (props : IUseFilteredListStories) => {
    const {onComplete} = props;
    const categoryId =props.categoryId;
    const getFilteredListStories = async () => {
        try{
            const params : TypeFilteredListStories = {categoryId: categoryId};
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