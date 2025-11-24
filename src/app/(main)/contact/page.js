import { createMetadata } from "@/helpers/metadata";
import Contact from "@/components/client-page/main/Contact";

export const metadata = createMetadata({
    title: "ติดต่อเรา",
    description: "ติดต่อทีมงาน Mepatcs เพื่อสอบถามราคา ขอใบเสนอราคา หรือปรึกษาการสร้างบ้านฟรี เราพร้อมให้คำแนะนำและดูแลทุกขั้นตอนด้วยความใส่ใจ",
    keywords: [
        "ติดต่อบริษัทรับสร้างบ้าน",
        "ขอใบเสนอราคา",
        "ปรึกษาสร้างบ้าน",
        "ติดต่อผู้รับเหมา",
        "ติดต่อ Mepatcs"
    ],
    canonical: "/contact",
});

function ContactPage() {
    return (
        <Contact />
    );
}

export default ContactPage;