import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <img src="/bgjar/WafeLine.svg" alt="WafeLine" className='absolute w-full h-screen objeect cover top-0 left-0 -z-10'/>

            <div className="mt-6 w-full overflow-hidden backdrop-blur-sm bg-black/50 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
