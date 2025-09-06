import { useEffect, useState } from "react";
import Hero from '../components/Hero';
import HomeCards from "../components/HomeCards";
import JobListings from "../components/JobListings";
import ViewAllJobs from "../components/ViewAllJobs";
import { getCurrentUser } from "../api/auth";
const HomePage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user?.name) setUserName(user.name);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Hero userName={userName} />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePage;
