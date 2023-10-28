import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const Search = ({ searchHandler }: any) => {
	const router = useRouter();
	const [query, setQuery] = useState(router.query?.search || "");
	// const [showSearch, setShowSearch] = useState(false);

	const handleSearch = (e: any) => {
		e.preventDefault();
		if (query.length > 1) {
			if (router.pathname !== "/browse") {
				router.push(`/browse?search=${query}`);
			} else {
				searchHandler(query);
			}
		} else if (query.length == 0 && router.pathname == "/browse") {
			searchHandler(query);
		}
	};

	return (
		<div className="flex-grow relative">
			<form
				onSubmit={(e) => handleSearch(e)}
				className="bg-amazon-orange flex flex-grow items-center rounded-md max-md:mx-4 max-md:mb-2"
			>
				<input
					// onClick={() => setShowSearch((prev) => !prev)}
					type="text"
					className="outline-none w-full h-11 text-black pl-3 max-md:rounded-l"
					placeholder="Search Giftify"
					onChange={(e: any) => setQuery(e.target.value)}
					defaultValue={query}
				/>
				<button type="submit">
					<MagnifyingGlassIcon className="text-amazon-blue_dark h-8 w-8 my-1 mx-2 cursor-pointer" />
				</button>
			</form>
			{/* {showSearch && (
                <div className="z-20 absolute top-11 w-full h-auto bg-white border rounded-sm shadhow-md">
                    <ul className="text-black">
                        <li className="px-3 py-2 border-b cursor-pointer hover:bg-gray-100 font-semibold">
                            search Result 1
                        </li>
                        <li className="px-3 py-2 border-b cursor-pointer hover:bg-gray-100 font-semibold">
                            search Result 2 
                        </li>
                        <li className="px-3 py-2 border-b cursor-pointer hover:bg-gray-100 font-semibold">
                            search Result 3
                        </li>
                    </ul>
                </div>
            )} */}
		</div>
	);
};

export default Search;
