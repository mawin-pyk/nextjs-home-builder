import Image from "next/image";

import {
    Box,
    Grid,
    Typography,
} from "@mui/material";
import RoofingOutlinedIcon from '@mui/icons-material/RoofingOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { gridToSizes } from "@/helpers/helpers";

import CustomBreadcrumbs from "@/components/share/CustomBreadcrumbs";
import Footer from "@/components/layout/Footer";
import FadeInSection from "@/components/share/FadeInSection";

const breadcrumbs = [
    { label: "หน้าแรก", href: "/" },
    { label: "บริการของเรา" }
];

const services = [
    {
        title: "งานก่อสร้าง",
        description: "บริการสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน",
        image: "/construct.webp",
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
        image: "/plan.webp",
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
        image: "/renovate.webp",
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
                    gap={8}
                >
                    <CustomBreadcrumbs items={breadcrumbs} />

                    <FadeInSection>
                        <Box textAlign="center">
                            <Typography variant="h1" fontSize={{ xs: "32px", md: "40px" }} fontWeight="400" gutterBottom>
                                บริการของเรา
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                เราพร้อมดูแลทุกขั้นตอนในการสร้างบ้านในฝันของคุณ
                            </Typography>
                        </Box>
                    </FadeInSection>

                    <>
                        <Box
                            display={{ xs: "flex", sm: "none" }}
                            overflow="auto"
                            gap={2}
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
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        height="100%"
                                    >
                                        <Box position="relative" width="100%" height="360px">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                sizes={gridToSizes({ xs: 12, sm: 6, lg: 4 }, 1400)}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                        <Box p={4} border="1px solid" borderColor="divider" sx={{ color: "text.primary" }} flexGrow={1}>
                                            <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                                <Box
                                                    width="50px"
                                                    height="50px"
                                                    mb={2}
                                                    p={1}
                                                    boxSizing="border-box"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    bgcolor="divider"
                                                    borderRadius="50%"
                                                >
                                                    {service.icon}
                                                </Box>
                                                <Typography variant="h4" fontSize="22px" fontWeight="600" gutterBottom>
                                                    {service.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2">
                                                {service.description}
                                            </Typography>
                                            <Box mt={4} display="flex" flexDirection="column" gap={1}>
                                                {service.list.map((item, idx) => (
                                                    <Box key={idx} display="flex" justifyContent="flex-start" alignItems="flex-start" gap={1}>
                                                        <CheckBoxIcon fontSize="small" color="success" />
                                                        <Typography variant="body2">{item}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box display={{ xs: "none", sm: "block" }}>
                            <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                                {services.map((service, index) => (
                                    <Grid
                                        key={index}
                                        size={{ xs: 12, sm: 6, lg: 4 }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            height="100%"
                                        >
                                            <Box position="relative" width="100%" height="360px">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    sizes={gridToSizes({ xs: 12, sm: 6, lg: 4 }, 1400)}
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </Box>
                                            <Box p={4} border="1px solid" borderColor="divider" sx={{ color: "text.primary" }} flexGrow={1}>
                                                <Box display="flex" justifyContent="flex-start" alignItems="center" gap={2}>
                                                    <Box
                                                        width="50px"
                                                        height="50px"
                                                        mb={2}
                                                        p={1}
                                                        boxSizing="border-box"
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        bgcolor="divider"
                                                        borderRadius="50%"
                                                    >
                                                        {service.icon}
                                                    </Box>
                                                    <Typography variant="h4" fontSize="22px" fontWeight="600" gutterBottom>
                                                        {service.title}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2">
                                                    {service.description}
                                                </Typography>
                                                <Box mt={4} display="flex" flexDirection="column" gap={2}>
                                                    {service.list.map((item, idx) => (
                                                        <Box key={idx} display="flex" justifyContent="flex-start" alignItems="flex-start" gap={1}>
                                                            <CheckBoxIcon fontSize="small" color="success" />
                                                            <Typography variant="body2">{item}</Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default Services;