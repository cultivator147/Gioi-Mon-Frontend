import { getDetailStory } from "../api/modules/stories/stories";
import { Logger } from "../utils/helper";

export interface IUseDetailStoryProps {
    onComplete : (response : any) => any;
    storyId: any;
}
const useDetailStory = (props : IUseDetailStoryProps) => {
    const {onComplete} = props;
    const storyId =props.storyId;
    const getDataDetailStory = async () => {
        try{
            const response = await getDetailStory({story_id: storyId});
            Logger('api data: ', response?.data?.data?.content);
            onComplete(response?.data?.data);
        }catch(err){
            Logger('err call api: ', err);
        }
    }
    return {getDataDetailStory};
}
export default useDetailStory;