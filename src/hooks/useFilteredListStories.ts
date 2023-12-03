import { getFilteredListStoriesRequest } from "../api/modules/stories/stories";
import { Logger } from "../utils/helper";

interface IUseFilteredListStories {
    onComplete : (response : void) => any;
}
const useFilteredListStories = (props : IUseFilteredListStories) => {
    const {onComplete} = props;
    const getFilteredListStories = async () => {
        try{
            const response = await getFilteredListStoriesRequest();
            Logger(response?.data?.data?.content);
            onComplete(response?.data?.data?.content);
        }catch(err){
            Logger('err call api: ', err);
        }
    }
    return {getFilteredListStories};
}
export default useFilteredListStories;