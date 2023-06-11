export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Billing",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/dashboard",
        },
        {
            label: "Invoices",
            href: "/invoices",
        },
        {
            label: "Settings",
            href: "/settings",
        },
    ],
    links: {
        github: "https://github.com/Badbird5907/billing",
    },
};
