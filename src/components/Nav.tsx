import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shadcdn/navigation-menu";
import { genresArr } from "@/utils/filters";
import { ShuffleIcon } from "lucide-react";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="my-8 md:my-0">
      <NavigationMenu className="list-none z-[500] gap-2 flex-wrap">
        <NavigationMenuItem className="">
          <Link href="/trending" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent text-lg`}
            >
              Trending
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/popular" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent text-lg`}
            >
              Popular
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/random" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent text-lg`}
            >
              <ShuffleIcon className="w-5 h-5" />
              Random
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger className="bg-transparent">
            Genres
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-[500]">
            <ul className="grid w-full grid-cols-2 gap-2 p-2 md:w-[100px] md:grid-cols-2 lg:w-[300px]">
              {genresArr.map((genre, idx) => (
                <NavigationMenuLink
                  key={idx}
                  className="text-white text-md hover:bg-teal-600 hover:text-black transition-all rounded-md p-2"
                  href={`/genre/${genre}`}
                >
                  {genre}
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
};

export default Nav;
