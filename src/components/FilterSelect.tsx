import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcdn/select"



const FilterSelect = ({ setState, placeholder, array }: {
    setState: any
    placeholder: string
    array: string[]
}) => {
    function setValue(value: string) {
        if (placeholder === 'Genres') {
            setState((prev: any) => [...prev, value])
        }

        setState(value)
    }
    return (
        <Select onValueChange={(value) => setValue(value)}>
            <SelectTrigger className="w-[180px] outline-none focus-within:border-none">
                <SelectValue placeholder={placeholder} className=' ' />
            </SelectTrigger>
            <SelectContent onChange={(e) => console.log(e.target)} className='bg-zinc-950 text-slate-100'>
                {array.map((value, idx) => (
                    <SelectItem className='' key={idx} value={value}>{value}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
export default FilterSelect