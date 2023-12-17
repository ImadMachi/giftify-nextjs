import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import logo from "../public/assets/images/logo.png";

const Footer = () => {
	return (
		<div className="flex flex-col w-full mx-auto bg-amazon-blue_light">
			<Link href="#">
				<div className="flex bg-[#37475a] hover:bg-[#485769] justify-center">
					<p className="text-white text-xs py-4">Back to top</p>
				</div>
			</Link>

			<div className="grid grid-cols-2 lg:grid-cols-2  md:px-32 gap-4 px-5 bg-amazon-blue_light justify-center py-10 md:space-x-16 border-b border-slate-600 max-w-4xl m-auto">
				<div className="link-footer">
					<h5>Get to Know Us</h5>
					<ul>
						<li>
							<Link href="/">Blog</Link>
						</li>
						<li>
							<Link href="/">About Giftify</Link>
						</li>
						<li>
							<Link href="/">Investor Relations</Link>
						</li>
						<li>
							<Link href="/">Amazon Devices</Link>
						</li>
						<li>
							<Link href="/">Amazon Science</Link>
						</li>
					</ul>
				</div>

				<div className="link-footer">
					<h5>Let Us Help You</h5>
					<ul>
					
						<li>
							<Link href="/">Your Account</Link>
						</li>
						<li>
							<Link href="/">Your Orders</Link>
						</li>
						<li>
							<Link href="/">Shipping Rates & Policies</Link>
						</li>
						<li>
							<Link href="/">Returns & Replacements</Link>
						</li>
						<li>
							<Link href="/">Manage Your Content and Devices</Link>
						</li>
						<li>
							<Link href="/">Giftify Assistant</Link>
						</li>
						<li>
							<Link href="/">Help</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex max-md:flex-col items-center bg-amazon-blue_light justify-center py-1">
				<Image src={logo} alt="logo" className="object-contain w-32 h-20 md:mr-20" />

				<div className="flex items-center space-x-2 max-md:mb-4 text-white">&copy; 2023 - AlphaTech</div>
			</div>
		</div>
	);
};

export default Footer;
