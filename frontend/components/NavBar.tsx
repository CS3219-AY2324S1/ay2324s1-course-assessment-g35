import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full h-20 shadow-xl bg-white">
            <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
                <Link href="/Main">
                    {/* <Image src={Logo} alt="Logo" width="205" height="75" className="cursor-pointer" priority /> */}
                    image
                </Link>
                <div>
                    <ul className="hidden sm:flex">
                        <Link href="/Profile">
                            <li className="m1-10 uppercase hover:border-b text-xl ">Profile</li>
                        </Link>
                        <Link href="/Login">
                            <li className="mx-10 uppercase hover:border-b text-xl">
                                Logout
                            </li>
                        </Link>
                    </ul> 
                </div>
            </div>
        </nav>
    );
};
export default Navbar;