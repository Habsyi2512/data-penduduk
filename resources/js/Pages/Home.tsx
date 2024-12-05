import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

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
                <header className="h-16 w-full border-b border-gray-600 bg-[#0E2A47] shadow"></header>
                <img
                    src="/bgjar/WorldMap.svg"
                    alt=""
                    className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
                />
                {/* content 1 */}
                <div className="h-[calc(100vh-64px)] w-full bg-black/20 p-16 backdrop-blur-[3px]">
                    <div className="flex relative h-full w-full rounded bg-[#0E2A47]/80">
                        <img
                            src="/bgjar/WorldMap.svg"
                            alt=""
                            className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
                        />
                        <div className="font-inter px-5 my-auto basis-1/2">
                            <h1 className="text-3xl font-[900] text-slate-200">
                                WEBSITE STATISTIK
                            </h1>
                            <h1 className="text-3xl font-[900] text-slate-200">
                                DATA PENDUDUK
                            </h1>
                            <h1 className="text-3xl font-[900] text-slate-200">
                                KEPULAUAN RIAU
                            </h1>
                        </div>

                        <div className="basis-1/2"></div>
                    </div>
                </div>
            </div>
            {/* <div>content w</div> */}
        </>
    );
}
