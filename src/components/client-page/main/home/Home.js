import { Box } from "@mui/material";
import BannerSection from "@/components/client-page/main/home/BannerSection";
import TrustSection from "@/components/client-page/main/home/TrustSection";
import ServiceSection from "@/components/client-page/main/home/ServiceSection";
import ProjectSection from "@/components/client-page/main/home/ProjectSection";
import HomeDesignSection from "@/components/client-page/main/home/HomeDesignSection";
import AboutSection from "@/components/client-page/main/home/AboutSection";
import ArticleSection from "@/components/client-page/main/home/ArticleSection";
import CtaSection from "@/components/client-page/main/home/CtaSection";
import Footer from "@/components/layout/Footer";

function Home({ propertyTypes, projects, articles, homeDesigns }) {
    return (
        <Box component="main">
            <BannerSection />
            <TrustSection />
            <ServiceSection />
            {/* <ProjectSection projects={projects} /> */}
            <HomeDesignSection propertyTypes={propertyTypes} homeDesigns={homeDesigns} />
            <AboutSection />
            <ArticleSection articles={articles} />
            <CtaSection />
            <Footer />
        </Box>
    );
}

export default Home;