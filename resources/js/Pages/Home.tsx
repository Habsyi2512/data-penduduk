import HyperText from '@/Components/ui/hyper-text';
import OrbitingCircles from '@/Components/ui/orbiting-circles';
import GuestHeader from '@/Layouts/GuestHeader';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Home({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative h-screen w-full text-black/50">
                <GuestHeader />
                <img
                    src="/bgjar/WorldMap.svg"
                    alt=""
                    className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
                />
                {/* content 1 */}
                <div className="h-[calc(100vh-64px)] w-full bg-black/20 p-16 backdrop-blur-[3px]">
                    <div className="relative flex h-full w-full rounded bg-[#0E2A47]/80">
                        <img
                            src="/bgjar/WorldMap.svg"
                            alt=""
                            className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
                        />
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                y: -10,
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.2,
                                delay: 0.5,
                                ease: 'linear',
                            }}
                            className="my-auto basis-1/2 px-5 font-inter"
                        >
                            <h1 className="text-center text-5xl font-[800] text-gray-300">
                                WEB STATISTIK DATA PENDUDUK
                            </h1>
                            <h1 className="text-center text-5xl font-[800] text-gray-300">
                                KEPULAUAN RIAU
                            </h1>
                        </motion.div>

                        <div className="basis-1/2">
                            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                                <HyperText
                                    className="pointer-events-none mt-[180px] whitespace-pre-wrap bg-gradient-to-b from-gray-200 to-blue-900 to-90% bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black"
                                    text="KEPULAUAN RIAU"
                                />
                                <OrbitingCircles
                                    className="size-[70px] border-none bg-transparent"
                                    duration={20}
                                    delay={15}
                                    radius={0}
                                >
                                    <img
                                        src="/logo-kabupaten/Kepri.png"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={20}
                                    delay={15}
                                    radius={90}
                                >
                                    <img
                                        src="/logo-kabupaten/Anambas.webp"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={20}
                                    delay={25}
                                    radius={90}
                                >
                                    <img
                                        src="/logo-kabupaten/Batam.png"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={15}
                                    delay={10}
                                    radius={150}
                                >
                                    <img
                                        src="/logo-kabupaten/Bintan.png"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={20}
                                    delay={30}
                                    radius={150}
                                >
                                    <img
                                        src="/logo-kabupaten/Karimun.gif"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={10}
                                    delay={30}
                                    radius={150}
                                >
                                    <img
                                        src="/logo-kabupaten/Lingga.png"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={25}
                                    delay={10}
                                    radius={200}
                                >
                                    <img
                                        src="/logo-kabupaten/Natuna.png"
                                        alt=""
                                    />
                                </OrbitingCircles>
                                <OrbitingCircles
                                    className="size-[30px] border-none bg-transparent"
                                    duration={30}
                                    delay={20}
                                    radius={200}
                                >
                                    <img
                                        src="/logo-kabupaten/Tanjungpinang.png"
                                        alt=""
                                    />
                                </OrbitingCircles>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[calc(100vh-64px)] w-full"></div>
            </div>
            {/* <div>content w</div> */}
        </>
    );
}
