import { HomePage } from "../app/pages/HomePage";
import { SearchPage } from "../app/pages/SearchPage";

const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tim-truyen/:categoryid', component: SearchPage},
]
export { publicRoutes,  };
