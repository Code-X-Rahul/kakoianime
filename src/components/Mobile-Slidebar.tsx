"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/shadcdn/sheet";
import { Button } from "@/shadcdn/button";
import Nav from "@/components/Nav";
import Image from "next/image";
import logo from '@/assets/logo.png'

export const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <div className="w-full h-[4rem] my-5">
                    <Image
                        src={logo}
                        alt="logo"
                        className="w-full h-full"
                    />
                </div>
                <Nav />
            </SheetContent>
        </Sheet>
    );
};
