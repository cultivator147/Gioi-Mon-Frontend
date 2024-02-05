import { TypeSearch } from "../api/interfaces/listStories";
import { searchRequest } from "../api/modules/stories/listStories";
import { Logger } from "../utils/helper";


export interface ITypeSearch {
    onComplete : (response : any) => any;
    keyword: any;
    page?: number;
    size?: number;
}
const useSearch = (props : ITypeSearch) => {
    const {onComplete, keyword, page, size} = props;
    
    const search = async () => {
        try{
            const params : TypeSearch = {keyword: keyword, page: page, size: size};
            const response = await searchRequest(params);
            Logger('api data: ', response?.data?.data);
            onComplete(response?.data?.data);
        }catch(err){
            Logger('err call api: ', err);
        }
    };
    return {search};
}
export default useSearch;