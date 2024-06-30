import { getStoryContent } from "../api/modules/stories/stories";
import { Logger } from "../utils/helper";

export interface IUseStoryContent {
    onComplete : (response : any) => any;
    storyId: number;
    chapterId: number;
}
const useStoryContent = (props : IUseStoryContent) => {
    const {onComplete,storyId, chapterId} = props;
    const getDataStoryContent = async () => {
        try{
            const response = await getStoryContent({story_id: storyId, chapter_number: chapterId});
            Logger('api data: ', response?.data?.data);
            onComplete(response?.data?.data);
        }catch(err){
            Logger('err call api: ', err);
        }
    }
    return {getStoryContent: getDataStoryContent};
}
export default useStoryContent;