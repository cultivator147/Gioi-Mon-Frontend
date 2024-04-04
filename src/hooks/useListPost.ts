import { TypeFilteredListStories, TypeSearch } from "../api/interfaces/listStories";
import { TypeListPost } from "../api/interfaces/listPost";
import { getListPost } from "../api/modules/post/listPost";
import { Logger } from "../utils/helper";

export interface IUseListPost {
    onComplete : (response : any) => any;
    page?: number;
    size?: number;
}
const useListPost = (props : IUseListPost) => {
    const {onComplete, page, size} = props;
    const getListPosts = async () => {
        try{
            const params : TypeListPost = {page: page, size: size};
            const response = await getListPost(params);
            Logger('api data: ', response?.data?.data);
            onComplete(response?.data?.data);
        }catch(err){
            Logger('err call api: ', err);
        }
    };
   
    return {getListPosts};
}
export default useListPost;