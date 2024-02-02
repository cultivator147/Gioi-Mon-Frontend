import { HomePage } from "../app/pages/HomePage";
import { LoginPage } from "../app/pages/LoginPage";
import { RegisterPage } from "../app/pages/RegisterPage";
import Birth from "../app/pages/RegisterPage/RegisterProfile/Birthday";
import Gender from "../app/pages/RegisterPage/RegisterProfile/Gender";
import NickName from "../app/pages/RegisterPage/RegisterProfile/NickName";
import { SearchPage } from "../app/pages/SearchPage";
import { StoryContentPage } from "../app/pages/StoryContentPage";
import { StoryPage } from "../app/pages/StoryPage";

const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/register', component: RegisterPage},
    {path: '/login', component: LoginPage},
    {path: '/tim-truyen/:categoryid', component: SearchPage},
    {path: '/tim-truyen/leaderboard/:leaderboardid', component: SearchPage},
    {path: '/tim-truyen/:categoryid/:writing_state', component: SearchPage},
    {path: '/tim-truyen/:categoryid/:writing_state/sort_by=:sort_by', component: SearchPage},
    {path: '/truyen-tranh/:storyid', component: StoryPage},
    {path: '/truyen-tranh/:storyid/:chapternumber', component: StoryContentPage},
];
const privateRoutes = [
    {path: '/profile', component: SearchPage},
    { path: '/register/nickname', component: NickName },
    { path: '/register/picture', component: NickName },
    { path: '/register/birthday', component: Birth },
    { path: '/register/gender', component: Gender },
];
export { publicRoutes,  privateRoutes};
