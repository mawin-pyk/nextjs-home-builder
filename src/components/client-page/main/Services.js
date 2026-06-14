import Link from "next/link";

import {
    Box,
    Grid,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_SOFT = "rgba(132, 94, 247, 0.08)";
const PURPLE_FAINT = "rgba(132, 94, 247, 0.03)";
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา" }
];

const services = [
    {
        title: "รับสร้างบ้าน",
        description: "บริการสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน",
        href: "/services/home-building",
        icon: <RoofingOutlinedIcon fontSize="large" />,
        list: [
            "งานโครงสร้างหลัก: เสาเข็ม ฐานราก คาน-เสา พื้น และโครงสร้างทั้งหมดตามมาตรฐานวิศวกรรม",
            "งานก่ออิฐ–ฉาบปูน: โครงผนังแข็งแรง ได้ความเรียบและความแน่นตามสเปคงานก่อสร้าง",
            "งานหลังคา: โครงหลังคา มุงกระเบื้อง/เมทัลชีท และระบบกันรั่วตามมาตรฐาน",
            "งานระบบไฟฟ้า–ประปา: เดินระบบใหม่ทั้งหลังพร้อมอุปกรณ์ที่ได้มาตรฐานความปลอดภัย",
            "งานตกแต่งภายในพื้นฐาน: ฝ้า ผนัง พื้น ประตู–หน้าต่าง และงานเก็บรายละเอียดหน้างาน",
            "ตรวจงานทุกขั้นตอน: ควบคุมคุณภาพตามแผนงานและตรวจจุดสำคัญก่อนส่งมอบบ้าน",
            "ส่งงานตามสัญญา: แผนงานชัดเจน ส่งมอบบ้านตรงเวลา ดูแลงานจนเสร็จสมบูรณ์"
        ]
    },
    {
        title: "ออกแบบ/เขียนแบบ",
        description: "ออกแบบบ้านให้ตรงกับความต้องการของคุณ พร้อมคำแนะนำ",
        icon: <SquareFootOutlinedIcon fontSize="large" />,
        list: [
            "ออกแบบบ้านใหม่: ออกแบบผังบ้าน พร้อมภาพ 3D เพื่อให้เห็นดีไซน์ก่อนสร้างจริง",
            "เขียนแบบก่อสร้างตามมาตรฐาน: จัดทำแบบสถาปัตย์–โครงสร้างตามหลักวิศวกรรม",
            "แบบยื่นขออนุญาตปลูกสร้าง: เตรียมเอกสารและแบบสำหรับใช้ยื่นกับเทศบาล/อบต.",
            "ปรับแบบตามงบประมาณ: ออกแบบให้เหมาะกับงบที่ลูกค้าตั้งไว้ ไม่บานปลาย",
            "เรนเดอร์ภาพบ้าน (Perspective): ภาพเหมือนจริงเพื่อพิจารณาก่อนสร้าง",
            "ปรับแก้แบบตามความต้องการ: ปรับแก้แปลนและดีไซน์จนกว่าจะได้แบบที่ตรงกับการใช้งาน"
        ]
    },
    {
        title: "งานรีโนเวท/ต่อเติม",
        description: "ปรับปรุงบ้านเก่าให้เหมือนใหม่ พร้อมโครงสร้างปลอดภัย",
        icon: <CarpenterOutlinedIcon fontSize="large" />,
        list: [
            "รีโนเวทบ้านทั้งหลัง: ปรับปรุงงานโครงสร้าง ระบบไฟ–ประปา และงานตกแต่งให้ใช้งานได้ดีขึ้น",
            "ต่อเติมครัว / โรงจอดรถ: ออกแบบและก่อสร้างให้ใช้งานได้จริง แข็งแรง เหมาะกับพื้นที่บ้าน",
            "ปรับฟังก์ชันให้เหมาะกับผู้สูงอายุ: ติดตั้งราวจับ ห้องน้ำกันลื่น และปรับระดับพื้นที่ให้ปลอดภัย",
            "ปรับปรุงงานเดิม: ตรวจเช็กหน้างานและซ่อมแก้จุดบกพร่องเพื่อให้ได้มาตรฐานใช้งานจริง",
            "ปรับผังพื้นที่ใหม่: ออกแบบการใช้งานภายในให้เหมาะกับไลฟ์สไตล์และการใช้สอยของบ้าน",
            "ปรับปรุงห้องน้ำ–ห้องครัว: ระบบท่อ ปูกระเบื้อง ติดตั้งสุขภัณฑ์ และงานปรับปรุงพื้นที่ใช้งานสำคัญ"
        ]
    }
];

const features = [
    {
        icon: <VerifiedOutlinedIcon />,
        title: "มาตรฐานงานก่อสร้าง",
        description: "ควบคุมคุณภาพทุกขั้นตอนตามหลักวิศวกรรม ตรวจจุดสำคัญก่อนส่งมอบ",
    },
    {
        icon: <EngineeringOutlinedIcon />,
        title: "ทีมงานมืออาชีพ",
        description: "ดูแลด้วยทีมเดียวตั้งแต่ออกแบบ ก่อสร้าง จนส่งมอบบ้าน",
    },
    {
        icon: <RequestQuoteOutlinedIcon />,
        title: "ราคาโปร่งใส",
        description: "แจกแจงงบประมาณและแผนงานชัดเจน ไม่บานปลายภายหลัง",
    },
    {
        icon: <SupportAgentOutlinedIcon />,
        title: "ปรึกษาฟรี",
        description: "พูดคุยความต้องการและประเมินราคาเบื้องต้นฟรี ก่อนตัดสินใจ",
    },
];

const stats = [
    { value: `${services.length}`, label: "บริการหลัก" },
    { value: "ครบวงจร", label: "ดูแลทุกขั้นตอน" },
    { value: "ฟรี", label: "ปรึกษา & ประเมินราคา" },
];

function ServiceCard({ service, index }) {
    return (
        <Box
            height="100%"
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            border="1px solid"
            borderColor="divider"
            bgcolor="background.paper"
            sx={{
                color: "text.primary",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: PURPLE_SHADOW,
                    borderColor: PURPLE_BORDER,
                },
            }}
        >
            <Box
                position="relative"
                overflow="hidden"
                p={3.5}
                display="flex"
                alignItems="center"
                gap={2}
                bgcolor={PURPLE_SOFT}
                borderBottom="1px solid"
                borderColor={PURPLE_BORDER}
            >
                <Typography
                    aria-hidden
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "12px",
                        fontSize: "88px",
                        fontWeight: 700,
                        lineHeight: 1,
                        color: "rgba(132, 94, 247, 0.13)",
                        pointerEvents: "none",
                    }}
                >
                    {String(index + 1).padStart(2, "0")}
                </Typography>

                <Box
                    width="64px"
                    height="64px"
                    flexShrink={0}
                    zIndex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="background.paper"
                    borderRadius="50%"
                    color="primary.main"
                    boxShadow="0 4px 12px rgba(132, 94, 247, 0.18)"
                >
                    {service.icon}
                </Box>
                <Box zIndex={1}>
                    <Typography variant="overline" color="primary" fontWeight="700" letterSpacing="0.15em">
                        บริการ
                    </Typography>
                    <Typography variant="h3" fontSize="24px" fontWeight="600" lineHeight={1.2}>
                        {service.title}
                    </Typography>
                </Box>
            </Box>

            <Box p={4} flexGrow={1} display="flex" flexDirection="column">
                <Typography variant="body2" color="textSecondary">
                    {service.description}
                </Typography>

                <Divider sx={{ my: 2.5 }} />

                <Box display="flex" flexDirection="column" gap={1.5}>
                    {service.list.map((item, idx) => (
                        <Box key={idx} display="flex" alignItems="flex-start" gap={1}>
                            <CheckCircleOutlineRoundedIcon fontSize="small" sx={{ color: "primary.main", mt: "2px", flexShrink: 0 }} />
                            <Typography variant="body2" color="textSecondary">{item}</Typography>
                        </Box>
                    ))}
                </Box>

                <Box mt="auto" pt={4}>
                    <Button
                        component={Link}
                        href={service.href || "/contact"}
                        variant="outlined"
                        endIcon={<ArrowForwardIcon className="card-arrow" />}
                        sx={{
                            "& .card-arrow": { transition: "transform 0.3s ease" },
                            "&:hover .card-arrow": { transform: "translateX(4px)" },
                        }}
                    >
                        {service.href ? "ดูพื้นที่ให้บริการ" : "สอบถามบริการนี้"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

function Services() {
    return (
        <>
            <Box
                component="main"
                width="100%"
                py={14}
                px={{ xs: 2, sm: 3 }}
                boxSizing="border-box"
            >
                <Box
                    width="100%"
                    maxWidth="1400px"
                    m="0px auto"
                    display="flex"
                    flexDirection="column"
                    gap={14}
                >
                    <CustomBreadcrumbs items={breadcrumbs} />

                    <FadeInSection>
                        <Box textAlign="center">
                            <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                                MEPATCS SERVICE
                            </Typography>
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                บริการของเรา
                            </Typography>
                            <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                            <Typography variant="subtitle1" color="textSecondary">
                                เราพร้อมดูแลทุกขั้นตอนในการสร้างบ้านในฝันของคุณ
                            </Typography>

                            <Box
                                mt={5}
                                display="flex"
                                flexWrap="wrap"
                                justifyContent="center"
                                gap={{ xs: 3, md: 6 }}
                            >
                                {stats.map((stat, index) => (
                                    <Box key={index} minWidth="120px" textAlign="center">
                                        <Typography fontSize={{ xs: "28px", md: "36px" }} fontWeight="700" color="primary.main" lineHeight={1.2}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </FadeInSection>

                    <Box
                        display={{ xs: "flex", sm: "none" }}
                        overflow="auto"
                        gap={2}
                        pb={1}
                        sx={{
                            scrollSnapType: "x mandatory",
                            "&::-webkit-scrollbar": { display: "none" },
                        }}
                    >
                        {services.map((service, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: "0 0 85%",
                                    scrollSnapAlign: "center",
                                }}
                            >
                                <ServiceCard service={service} index={index} />
                            </Box>
                        ))}
                    </Box>
                    <Box display={{ xs: "none", sm: "block" }}>
                        <Grid container spacing={4}>
                            {services.map((service, index) => (
                                <Grid
                                    key={index}
                                    size={{ xs: 12, sm: 6, lg: 4 }}
                                >
                                    <ServiceCard service={service} index={index} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={6}>
                        <FadeInSection>
                            <Box textAlign="center">
                                <Typography variant="overline" color="primary" fontWeight="600" letterSpacing="0.2em">
                                    WHY MEPATCS
                                </Typography>
                                <Typography variant="h2" fontSize={{ xs: "26px", md: "32px" }} fontWeight="400" gutterBottom>
                                    ทำไมต้องเลือกเรา
                                </Typography>
                                <Box width="56px" height="4px" bgcolor="primary.main" mx="auto" mb={2} />
                                <Typography variant="subtitle1" color="textSecondary">
                                    ดูแลครบทุกขั้นตอน ด้วยทีมงานเดียวตั้งแต่ต้นจนจบ โปร่งใสทุกกระบวนการ
                                </Typography>
                            </Box>
                        </FadeInSection>

                        <Grid container spacing={4}>
                            {features.map((feature, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                                    <Box
                                        p={3}
                                        height="100%"
                                        boxSizing="border-box"
                                        border="1px solid"
                                        borderColor="divider"
                                        bgcolor={PURPLE_FAINT}
                                        display="flex"
                                        flexDirection="column"
                                        gap={1.5}
                                        sx={{
                                            transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                                            "&:hover": {
                                                borderColor: PURPLE_BORDER,
                                                boxShadow: PURPLE_SHADOW,
                                                transform: "translateY(-4px)",
                                            },
                                        }}
                                    >
                                        <Box
                                            width="48px"
                                            height="48px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            bgcolor={PURPLE_SOFT}
                                            borderRadius="50%"
                                            color="primary.main"
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h3" fontSize="18px" fontWeight="600">
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {feature.description}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    <FadeInSection>
                        <Box
                            position="relative"
                            overflow="hidden"
                            py={{ xs: 6, md: 8 }}
                            px={{ xs: 3, md: 8 }}
                            textAlign="center"
                            color="primary.contrastText"
                            sx={{ background: "linear-gradient(135deg, #845ef7 0%, #6741d9 100%)" }}
                        >
                            <Box position="relative" zIndex={1}>
                                <Typography variant="h2" fontSize={{ xs: "24px", md: "32px" }} fontWeight="600" gutterBottom>
                                    พร้อมเริ่มสร้างบ้านในฝันของคุณหรือยัง?
                                </Typography>
                                <Typography variant="subtitle1" mb={4} sx={{ opacity: 0.9 }}>
                                    ปรึกษาทีมงานมืออาชีพของเราได้ฟรี ประเมินราคาเบื้องต้นไม่มีค่าใช้จ่าย
                                </Typography>
                                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
                                    <Button
                                        component={Link}
                                        href="/contact"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            bgcolor: "background.paper",
                                            color: "primary.main",
                                            "&:hover": { bgcolor: "background.default" },
                                        }}
                                    >
                                        ติดต่อเรา
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/home-designs"
                                        variant="outlined"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            color: "primary.contrastText",
                                            borderColor: "rgba(255, 255, 255, 0.6)",
                                            "&:hover": {
                                                borderColor: "primary.contrastText",
                                                bgcolor: "rgba(255, 255, 255, 0.08)",
                                            },
                                        }}
                                    >
                                        ดูแบบบ้านของเรา
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </FadeInSection>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default Services;