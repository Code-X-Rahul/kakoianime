import Image from "next/image"
import Link from "next/link"
const CharacterCard = ({ characters }: any) => {
    return (
        // <div className='grid gap-1 grid-flow-col px-1 py-2 h-auto overflow-x-scroll hide-scrollbar'>
        <>
            {characters?.map((c: any) => (
                <div className={` relative overflow-hidden rounded-sm hover:scale-105 transition-all ease-in grid`} key={c.id}>
                    <div className="bg-zinc-900 aspect-square">
                        <Image width={100} height={100} src={c.image} className='w-[100%] h-full object-cover hover:opacity-60' alt={c.name?.full} />
                    </div>
                    <div className="line-clamp-2 h-12 ">
                        <h1 className='text-center px-3 text-zinc-100'>{c.name?.full}</h1>
                    </div>
                    {c.role === "MAIN" && <h3 className="text-center text-sm px-1 absolute top-0 right-0 text-zinc-800 bg-teal-400 rounded-bl-lg">{c.role}</h3>}
                    {c.role === "SUPPORTING" && <h3 className="text-center text-teal-400 text-sm px-1 absolute top-0 right-0 bg-zinc-900 rounded-bl-lg">{c.role}</h3>}
                </div>
            ))}
        </>
        // </div>
    )
}

export default CharacterCard