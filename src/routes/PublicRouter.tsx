import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { HomePage } from "../app/pages/HomePage";
import { SearchPage } from "../app/pages/SearchPage";
import { StoryPage } from "../app/pages/StoryPage";
import { StoryContentPage } from "../app/pages/StoryContentPage";
import styled from "styled-components";
import { PageWrapper } from "../app/components/PageWrapper";
import Footer from "../app/components/Footer/Footer";
import { Header } from "../app/components/Header";
import { NavBarWrapper } from "../app/components/NavBar";
import { useEffect, useState } from "react";
import { FeedPage } from "../app/pages/FeedPage";
import { ProfilePage } from "../app/pages/ProfilePage";
import { ReadingPage } from "../app/pages/ReadingPage";
const PublicRouter = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.match(/^\/truyen-tranh\/([^\/]+)\/([^\/]+)$/)) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location.pathname]);
  return (
    <Wrapper>
      {showHeader && (
        <>
          <Header />
          <NavBarWrapper />
        </>
      )}

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/tim-truyen/*" element={<SearchPage />} />
          <Route path="/tim-truyen/:categoryid" element={<SearchPage />} />
          <Route path="/tim-truyen/keyword=:keyword" element={<SearchPage />} />
          <Route
            path="/tim-truyen/leaderboard/:leaderboardid"
            element={<SearchPage />}
          />
          <Route
            path="/tim-truyen/:categoryid/WRITING_STATE=:writing_state"
            element={<SearchPage />}
          />
          <Route
            path="/tim-truyen/:categoryid/:writing_state/sort_by=:sort_by"
            element={<SearchPage />}
          />
          <Route path="/truyen-tranh/:storyid" element={<StoryPage />} />
          <Route path="/feed/filter_by=:filter_by/fav_status=:fav_status/sort_by=:sort_by/story_id=:story_id" element={<FeedPage />} />
          <Route path="/feed/filter_by=:filter_by/fav_status=:fav_status/sort_by=:sort_by" element={<FeedPage />} />
          <Route path="/feed/story_id=:story_id" element={<FeedPage />} />
          <Route path="/theo-doi" element={<ReadingPage />} />
          <Route
            path="/truyen-tranh/:storyid/:chapternumber"
            element={<StoryContentPage />}
          />
        </Routes>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default PublicRouter;
const Wrapper = styled(PageWrapper)`
  flex-direction: column;
`;
