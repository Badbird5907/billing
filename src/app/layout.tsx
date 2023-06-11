
import '@/styles/globals.css';

import {Metadata} from "next";
import {Providers} from "./providers";
import {Button} from "@nextui-org/react";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className='dark'>
        <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            {children}
        </Providers>
        </body>
        </html>
    );
}
export const metadata: Metadata = {
    title: 'Billing',
    description: 'Haha give me your money',
};
