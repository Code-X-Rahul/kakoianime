import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/shadcdn/tabs"
import CharacterCard from "./CharacterCard"
import Slider from "./Slider"
import Card from "./Card"

export function AllTabs({ characters, type, title }: any) {
    return (
        <Tabs defaultValue="characters" className="w-full">
            <TabsList className="grid w-[200px] grid-cols-2 bg-zinc-800">
                <TabsTrigger value="characters">Characters</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>
            <TabsContent value="related">
                {type?.length !== 0 && (
                    // <Slider type={type} heading="Related" />
                    <div className="grid grid-cols-3 gap-3 p-2 py-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                        {type?.map((anime: any) => <Card key={anime?.id} {...anime} />)}
                    </div>
                )}
            </TabsContent>
            <TabsContent value="characters">
                {characters?.length !== 0 && (
                    <div className="grid grid-cols-3 gap-3 p-2 py-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                        <CharacterCard
                            characters={characters}
                        />
                    </div>
                )}
            </TabsContent>
        </Tabs>
    )
}
