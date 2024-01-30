import { HomePage } from "../app/pages/HomePage";
import { SearchPage } from "../app/pages/SearchPage";
import { StoryContentPage } from "../app/pages/StoryContentPage";
import { StoryPage } from "../app/pages/StoryPage";

const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tim-truyen/:categoryid', component: SearchPage},
    {path: '/tim-truyen/leaderboard/:leaderboardid', component: SearchPage},
    {path: '/tim-truyen/:categoryid/:writing_state', component: SearchPage},
    
    {path: '/truyen-tranh/:storyid', component: StoryPage},
    {path: '/truyen-tranh/:storyid/:chapternumber', component: StoryContentPage},
]
export { publicRoutes,  };
