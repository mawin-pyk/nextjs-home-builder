import { Box } from "@mui/material";
import BannerSection from "@/components/client-page/main/home/BannerSection";
import ServiceSection from "@/components/client-page/main/home/ServiceSection";
import ProjectSection from "@/components/client-page/main/home/ProjectSection";
import HomeDesignSection from "@/components/client-page/main/home/HomeDesignSection";
import AboutSection from "@/components/client-page/main/home/AboutSection";
import ArticleSection from "@/components/client-page/main/home/ArticleSection";
import Footer from "@/components/layout/Footer";

function Home({ projects, articles, homeDesigns }) {
    return (
        <Box component="main">
            <BannerSection />
            <ServiceSection />
            {/* <ProjectSection projects={projects} /> */}
            <HomeDesignSection homeDesigns={homeDesigns} />
            <AboutSection />
            <ArticleSection articles={articles} />
            <Footer />
        </Box>
    );
}

export default Home;
