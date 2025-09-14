export default function StructuredData() {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://minhlocgroup.com'
        : 'http://localhost:3000';

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MinhLoc Group",
        "alternateName": "MinhLoc Group - Bất Động Sản Cao Cấp",
        "url": baseUrl,
        "logo": `${baseUrl}/Logo_MinhLocGroup.png`,
        "description": "Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.",
        "foundingDate": "2020",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "TP.HCM",
            "addressRegion": "TP.HCM",
            "addressCountry": "VN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84-xxx-xxx-xxx",
            "contactType": "customer service",
            "availableLanguage": "Vietnamese"
        },
        "sameAs": [
            "https://www.facebook.com/minhlocgroup",
            "https://www.linkedin.com/company/minhlocgroup"
        ],
        "areaServed": [
            {
                "@type": "City",
                "name": "TP.HCM"
            },
            {
                "@type": "City",
                "name": "Hà Nội"
            }
        ],
        "serviceType": "Real Estate Development",
        "keywords": "bất động sản, chung cư, biệt thự, đất nền, thương mại, TP.HCM, Hà Nội"
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "MinhLoc Group - Bất Động Sản Cao Cấp",
        "url": baseUrl,
        "description": "Khám phá dự án bất động sản cao cấp tại TP.HCM, Hà Nội. MinhLoc Group - Uy tín, chất lượng, giá tốt.",
        "publisher": {
            "@type": "Organization",
            "name": "MinhLoc Group",
            "url": baseUrl
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        },
        "inLanguage": "vi-VN"
    };

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Trang chủ",
                "item": baseUrl
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Dự án",
                "item": `${baseUrl}/projects`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Giới thiệu",
                "item": `${baseUrl}/about`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Liên hệ",
                "item": `${baseUrl}/contact`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
        </>
    );
}
