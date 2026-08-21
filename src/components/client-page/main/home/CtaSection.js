import { Box } from "@mui/material";

import CtaBanner from "@/components/share/CtaBanner";

function CtaSection() {
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
                <CtaBanner
                    title="พร้อมเริ่มสร้างบ้านในฝันของคุณหรือยัง?"
                    description="ปรึกษาทีมงานมืออาชีพของเราได้ฟรี ประเมินราคาเบื้องต้นไม่มีค่าใช้จ่าย"
                    secondaryLabel="ดูแบบบ้าน"
                    secondaryHref="/home-designs"
                />
            </Box>
        </Box>
    );
}

export default CtaSection;
