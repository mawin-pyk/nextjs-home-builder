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
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ContactPage",
                "name": "ติดต่อเรา",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
                "description": "ติดต่อทีมงาน Mepatcs เพื่อสอบถามราคา ขอใบเสนอราคา หรือปรึกษาการสร้างบ้านฟรี เราพร้อมให้คำแนะนำและดูแลทุกขั้นตอนด้วยความใส่ใจ"
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
                        "name": "ติดต่อเรา"
                    }
                ]
            },
            {
                "@type": "LocalBusiness",
                "name": "บริษัท เมพัฒน์.ซีเอส จำกัด",
                "alternateName": "Mepatcs",
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
                "image": `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
                "telephone": [
                    "+66-2-120-6859",
                    "+66-64-649-8717"
                ],
                "email": "mepatcs.co.th@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "58/1 หมู่5 ตำบลบางรักพัฒนา",
                    "addressLocality": "บางบัวทอง",
                    "addressRegion": "นนทบุรี",
                    "postalCode": "11110",
                    "addressCountry": "TH"
                },
                "sameAs": [
                    "https://www.facebook.com/MepatCS",
                    "https://www.instagram.com/mepat.cs",
                    "https://www.youtube.com/@mepatcs"
                ]
            }
        ]
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            
            <Contact />
        </>
    );
}

export default ContactPage;