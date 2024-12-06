export default function GuestHeader() {
    return (
        <header className="sticky left-0 top-0 z-20 h-16 w-full border-b border-gray-700 bg-[#0E2A47]/50 px-16 text-gray-300 shadow backdrop-blur">
            <nav className="flex h-full items-center space-x-8">
                <h1 className="font-inter text-3xl font-bold">LOGO KEPRI</h1>
                <ul className="w-fit flex space-x-5">
                    <li>
                        <a
                            href="#"
                            className="font-inter font-medium"
                        >
                            Beranda
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="font-inter font-medium"
                        >
                            Informasi
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
