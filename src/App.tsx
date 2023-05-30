import React from "react";
import { Routes, Route } from "react-router-dom";
//@ts-ignore
import loadable from "@loadable/component";
import MyNavBar from "./common/simple/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";

const MainContainer = loadable(() => import("./page/main/MainContainer"), {
  fallback: "Loading...",
});
const PostsContainer = loadable(() => import("./page/posts/userPosts"), {
  fallback: "Loading...",
});

function App() {
  return (
    <>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/users/:id" element={<PostsContainer />} />
      </Routes>
    </>
  );
}

export default App;
