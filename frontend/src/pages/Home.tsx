import Main from "@/components/Main";
import PhotoGallery from "@/components/PhotoGallery";
import { TimelineDemo } from "@/components/TimelineDemo";
import React from "react";

const Home = (): React.ReactElement => {
  return (
    <>
      <Main />
      <TimelineDemo />
      <PhotoGallery />
    </>
  );
};

export default Home;
