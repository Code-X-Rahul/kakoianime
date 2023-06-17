// Note: Search Form
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const Form = ({search}:any) => {
  const [query, setQuery] = useState("");
  const navigate = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (query === "") return;
    navigate.push(`/search/${query}`);
    setQuery("");
    search(false)
  };

  return (
    <form className="flex items-center justify-center relative pt-3 w-[90%] mx-auto">
      <input
        className="text-black w-[100%] mx-auto h-8 px-4 rounded-2xl"
        type="text"
        placeholder="One Piece"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-4"
        onClick={handleSubmit}
      >
        <RiSearchLine />
      </button>
    </form>
  );
};

export default Form;
