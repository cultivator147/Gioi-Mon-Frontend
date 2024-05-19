import { useSelector } from "react-redux";
import { TypeListPost } from "../api/interfaces/listPost";
import { TypeFilteredListStories, TypeSearch } from "../api/interfaces/listStories";
import { getListPost } from "../api/modules/post/listPost";
import { getFilteredListStoriesRequest, searchRequest } from "../api/modules/stories/listStories";
import { getUserSelector } from "../redux-toolkit/slice/userSlice/selector";
import { Logger } from "../utils/helper";

export interface IUseFilterPosts {
    onComplete : (response : any) => any;
    page?: number;
    size?: number;
    filterBy: any;
    favouriteStatus: any;
    sortBy?: any;

}
const useFilterPosts = (props : IUseFilterPosts) => {
    const user = useSelector(getUserSelector);

    const {onComplete, filterBy, favouriteStatus,sortBy, page, size} = props;
    const fetchFilterPosts = async () => {
        try{
            const params : TypeListPost = {filterBy: filterBy, favouriteStatus: favouriteStatus , page: page, size: size};
            const response = await getListPost(user.token, params);
            Logger('api data: ', response?.data?.data);
            onComplete(response?.data?.data);
        }catch(err){
            Logger('err call api: ', err);
        }
    };
   
    return {fetchFilterPosts};
}
export default useFilterPosts;