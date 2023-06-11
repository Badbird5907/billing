'use client';

import {
    Link,
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react";

import {link as linkStyles} from "@nextui-org/theme";

import {siteConfig} from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import {ThemeSwitch} from "@/components/theme-switch";
import {Logo,} from "@/components/icons";
import {useRouter} from "next/router";

interface AppWrapperProps {
    children: React.ReactNode[] | React.ReactNode | null | undefined;
    title?: string;
}

export const AppWrapper = ({children, title}: AppWrapperProps) => {
    const router = useRouter();
    return (
        <>
            <NextUINavbar maxWidth="xl" position="sticky">
                <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                    <NavbarBrand className="gap-3 max-w-fit">
                        <NextLink className="flex justify-start items-center gap-1" href="/">
                            <Logo/>
                            <p className="font-bold text-inherit">Billing</p>
                        </NextLink>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="flex w-full gap-3 sm:hidden" justify="end">
                    <ThemeSwitch/>
                </NavbarContent>

                <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
                    <div className="hidden lg:flex gap-4 justify-start ml-2">
                        {siteConfig.navItems.map((item) => {
                            const isActive =
                                router.pathname === item.href ||
                                (item.href !== "/" && router.pathname.startsWith(item.href));
                            return (
                                <NavbarItem key={item.href} isActive={isActive}>
                                    <NextLink
                                        className={clsx(
                                            linkStyles({color: isActive ? "primary" : "foreground"}),
                                            "data-[active=true]:text-primary data-[active=true]:font-medium"
                                        )}
                                        color="foreground"
                                        href={item.href}
                                    >
                                        {item.label}
                                    </NextLink>
                                </NavbarItem>
                            )
                        })}
                    </div>
                    <NavbarMenuToggle className="sm:hidden"/>
                </NavbarContent>
                <NavbarMenu>
                    <div className="mx-4 mt-2 flex flex-col gap-2">
                        {siteConfig.navItems.map((item, index) => {
                            const isActive =
                                router.pathname === item.href ||
                                (item.href !== "/" && router.pathname.startsWith(item.href));
                            return (
                                <NavbarMenuItem key={`${item}-${index}`}>
                                    <Link
                                        color={
                                            isActive
                                                ? "primary"
                                                : "foreground"
                                        }
                                        href="#"
                                        size="lg"
                                    >
                                        {item.label}
                                    </Link>
                                </NavbarMenuItem>
                            )
                        })}
                    </div>
                </NavbarMenu>
            </NextUINavbar>
            <h1 className="text-4xl font-bold text-center">{title}</h1>
            {children}
        </>
    );
};
