import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/shadcdn/navigation-menu"
import { genresArr } from "@/utils/filters"
import { ShuffleIcon } from "lucide-react"
import Link from "next/link"

const Nav = () => {
    return (
        <>
            <NavigationMenu className="list-none">
                <NavigationMenuItem className="">
                    <NavigationMenuTrigger className="bg-transparent">Genres</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-zinc-950 text-slate-100">
                        <ul className="grid w-[100px] gap-2 p-4 md:w-[100px] md:grid-cols-2 lg:w-[300px]">
                            {genresArr.map((genre, idx) => (
                                <NavigationMenuLink key={idx} className=" text-md hover:bg-teal-600 hover:text-black transition-all rounded-md p-2" href={`/genre/${genre}`}>
                                    {genre}
                                </NavigationMenuLink>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="">
                    <Link href="/trending" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-lg`}>
                            Trending
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href="/popular" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-lg`}>
                            Popular
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <Link href="/random" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-lg`}>
                            <ShuffleIcon className="w-5 h-5" />
                            Random
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenu>
        </>
    )
}

export default Nav