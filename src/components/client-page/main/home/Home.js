import { Box } from "@mui/material";
import BannerSection from "@/components/client-page/main/home/BannerSection";
import ServiceSection from "@/components/client-page/main/home/ServiceSection";
import ProjectSection from "@/components/client-page/main/home/ProjectSection";
import AboutSection from "@/components/client-page/main/home/AboutSection";
import ArticleSection from "@/components/client-page/main/home/ArticleSection";
import Footer from "@/components/layout/Footer";

function Home({ projects, articles }) {
    return (
        <Box component="main">
            <BannerSection />
            <ServiceSection />
            <ProjectSection projects={projects} />
            <AboutSection />
            <ArticleSection articles={articles} />
            <Footer />
        </Box>
    );
}

export default Home;
