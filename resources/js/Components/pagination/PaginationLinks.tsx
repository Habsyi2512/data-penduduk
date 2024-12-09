import { PaginationLink } from '@/interface/pagination/interface';
import { Link } from '@inertiajs/react';

export default function PaginationLinks({
    links,
}: {
    links: PaginationLink[];
}) {
    return (
        <ul className="mx-auto flex w-fit justify-center">
            {links.map((link, index) => {
                if (link.label == '...') {
                    return (
                        <Li
                            className={`inline-block border bg-gray-100 px-5 py-1 hover:bg-gray-200 dark:bg-gray-700`}
                        >
                            {link.label}
                        </Li>
                    );
                }
                if (link.label == '&laquo; Previous') {
                    return (
                        <Li key={index}>
                            <Link
                                href={link.url ?? '#'}
                                className={`inline-block rounded-l border border-gray-300 bg-gray-100 px-5 py-1 hover:bg-gray-200 dark:bg-gray-700`}
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
                                className={`inline-block rounded-r border border-gray-300 bg-gray-100 px-5 py-1 hover:bg-gray-200 dark:bg-gray-700`}
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
                            className={`inline-block border border-gray-300 px-5 py-1 hover:bg-gray-200 ${link.active ? 'bg-gray-200 dark:bg-gray-500' : 'bg-gray-100 dark:bg-gray-700'}`}
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
