import { Bars3Icon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const HeaderBottom = ({ handleOpenMenu }: any) => {
	return (
		<>
			<div className="bg-amazon-blue_dark md:bg-amazon-blue_light flex items-center py-2 px-4 md:space-x-4 text-white max-md:-mt-1 max-md:pb-4">
				{/* <div
                onClick={handleOpenMenu}
                className="hidden md:flex items-center cursor-pointer mr-2 text-lg"
            >
                <Bars3Icon className="h-7 mr-1" />
                <span className="font-bold text-sm">All</span>
            </div> */}
				<div className="flex flex-grow max-md:overflow-x-scroll scrollbar-hide text-sm whitespace-nowrap ">
					<ul className="flex space-x-4 justify-center w-full scrollbar-hide">
						<li className="">
							<Link href="">New</Link>
						</li>
						<li className="">
							<Link href="">Holiday</Link>
						</li>
						<li className="">
							<Link href="">Birthday</Link>
						</li>
						<li className="">
							<Link href="">Gifts</Link>
						</li>
						<li className="">
							<Link href="">Home</Link>
						</li>
						<li className="">
							<Link href="">Kitchen & Bar</Link>
						</li>
						<li className="">
							<Link href="">Jewelry</Link>
						</li>
						<li className="">
							<Link href="">Women</Link>
						</li>
						<li className="">
							<Link href="">Men</Link>
						</li>
						<li className="">
							<Link href="">Kids</Link>
						</li>
						<li className="">
							<Link href="">Fun</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex md:hidden items-center p-2 bg-amazon-blue_light text-slate-200 max-md:-mt-1">
				<MapPinIcon className="h-6 mr-1" />
				<span className="text-sm">Deliver to Germany</span>
			</div>
		</>
	);
};

export default HeaderBottom;
