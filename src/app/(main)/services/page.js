import { createMetadata } from "@/helpers/metadata";
import Services from "@/components/client-page/main/Services";

export const metadata = createMetadata({
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
});

const services = [
    {
        name: "รับสร้างบ้าน",
        description: "บริการสร้างบ้านครบวงจร ตั้งแต่วางแผนจนส่งมอบบ้าน ครอบคลุมงานโครงสร้าง งานระบบ และงานตกแต่งภายในพื้นฐาน",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/services/home-building`
    },
    {
        name: "ออกแบบ/เขียนแบบ",
        description: "ออกแบบบ้านให้ตรงกับความต้องการ พร้อมแบบก่อสร้างตามมาตรฐานวิศวกรรมและแบบยื่นขออนุญาตปลูกสร้าง"
    },
    {
        name: "งานรีโนเวท/ต่อเติม",
        description: "ปรับปรุงบ้านเก่าให้เหมือนใหม่ ต่อเติมพื้นที่ใช้สอย พร้อมโครงสร้างปลอดภัยตามมาตรฐาน"
    }
];

function ServicesPage() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "name": "บริการของเรา",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
                "description": "Mepatcs ครอบคลุมตั้งแต่เขียนแบบ ออกแบบบ้าน ขออนุญาตก่อสร้าง ไปจนถึงงานตกแต่งภายใน ครบจบในที่เดียว โดยทีมงานมืออาชีพ"
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "หน้าแรก",
                        "item": `${process.env.NEXT_PUBLIC_BASE_URL}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "บริการของเรา"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "name": "บริการของเรา",
                "itemListElement": services.map((service, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "item": {
                        "@type": "Service",
                        "name": service.name,
                        "description": service.description,
                        ...(service.url ? { "url": service.url } : {}),
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "บริษัท เมพัฒน์.ซีเอส จำกัด",
                            "alternateName": "Mepatcs",
                            "url": `${process.env.NEXT_PUBLIC_BASE_URL}`
                        }
                    }
                }))
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <Services />
        </>
    );
}

export default ServicesPage;