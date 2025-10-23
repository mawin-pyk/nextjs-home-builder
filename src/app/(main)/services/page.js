import Services from "@/components/client-page/main/Services";

export const metadata = {
    title: "บริการของเรา",
    description: "Mepatcs ครอบคลุมตั้งแต่เขียนแบบ ออกแบบบ้าน ขออนุญาตก่อสร้าง ไปจนถึงงานตกแต่งภายใน ครบจบในที่เดียว โดยทีมงานมืออาชีพ",
    keywords: [
        "บริการรับสร้างบ้าน",
        "ออกแบบบ้าน",
        "ตกแต่งภายใน",
        "ผู้รับเหมาบ้าน",
        "งานก่อสร้าง",
        "Mepatcs"
    ],
    canonical: "/services",
    robots: "index, follow",
}

function ServicesPage() {
    return (
        <Services />
    );
}

export default ServicesPage;