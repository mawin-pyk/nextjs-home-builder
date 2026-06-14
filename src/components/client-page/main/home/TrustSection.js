import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";

const trustItems = [
    {
        icon: <EngineeringOutlinedIcon />,
        value: "ครบวงจร",
        label: "ดูแลทุกขั้นตอน ตั้งแต่ออกแบบจนส่งมอบบ้าน",
    },
    {
        icon: <VerifiedOutlinedIcon />,
        value: "มาตรฐาน",
        label: "ควบคุมงานตามหลักวิศวกรรมโดยทีมงานมืออาชีพ",
    },
    {
        icon: <HandshakeOutlinedIcon />,
        value: "ตรงสัญญา",
        label: "รับผิดชอบจนจบงาน ส่งมอบตรงเวลา",
    },
    {
        icon: <SupportAgentOutlinedIcon />,
        value: "ฟรี",
        label: "ปรึกษาและประเมินราคาเบื้องต้น",
    },
];

function TrustSection() {
    return (
        <Box
            component="section"
            width="100%"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            bgcolor="background.paper"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto">
                <FadeInSection>
                    <Grid container spacing={4}>
                        {trustItems.map((item, index) => (
                            <Grid key={index} size={{ xs: 6, md: 3 }}>
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={1}>
                                    <Box
                                        width="56px"
                                        height="56px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bgcolor={PURPLE_SOFT}
                                        borderRadius="50%"
                                        color="primary.main"
                                    >
                                        {item.icon}
                                    </Box>
                                    <Typography fontSize={{ xs: "22px", md: "28px" }} fontWeight="700" color="primary.main" lineHeight={1.2}>
                                        {item.value}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </FadeInSection>
            </Box>
        </Box>
    );
}

export default TrustSection;