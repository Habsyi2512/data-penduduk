import { PaginationLink } from '@/interface/pagination/interface';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

export default function PaginationLinks({
    links,
}: {
    links: PaginationLink[];
}) {
    return (
        <ul className="mt-5 flex mx-auto w-fit justify-center">
            {links.map((link, index) => {
                if (link.label == '...') {
                    return (
                        <Li className={`inline-block border px-5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700`}>
                            {link.label}
                        </Li>
                    );
                }
                if (link.label == '&laquo; Previous') {
                    return (
                        <Li key={index}>
                            <Link
                                href={link.url ?? '#'}
                                className={`inline-block border-gray-300 hover:bg-gray-200 border rounded-l px-5 py-2 bg-gray-100 dark:bg-gray-700 `}
                            >
                                Prev
                            </Link>
                        </Li>
                    );
                }
                if (link.label == 'Next &raquo;') {
                    return (
                        <Li key={index}>
                            <Link
                                className={`inline-block border-gray-300 hover:bg-gray-200 border rounded-r px-5 py-2 bg-gray-100 dark:bg-gray-700`}
                                href={link.url ?? '#'}
                            >
                                Next 
                            </Link>
                        </Li>
                    );
                }
                return (
                    <Li key={index}>
                        <Link
                            className={`inline-block border-gray-300 hover:bg-gray-200 border px-5 py-2 ${link.active ? 'bg-gray-200 dark:bg-gray-500':'bg-gray-100 dark:bg-gray-700'}`}
                            href={link.url ?? '#'}
                        >
                            {link.label}
                        </Link>
                    </Li>
                );
            })}
        </ul>
    );
}

interface LiProps extends React.HTMLProps<HTMLLIElement> {
    children: React.ReactNode;
}

const Li = ({ children, ...props }: LiProps) => {
    return <li {...props}>{children}</li>;
};
