import { useContext } from "react";
import Hero from '../components/Hero';
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext); // get user from context

  return (
    <>
      <Hero userName={user?.name} />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
