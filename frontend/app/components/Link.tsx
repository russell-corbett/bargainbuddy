import { ReactNode } from 'react';
import NextLink from 'next/link';

export { Link };

interface LinkProps {
    href: string;
    children: ReactNode;
    [key: string]: any;
}

function Link({ href, children, ...props }: LinkProps) {
    return (
        <NextLink href={href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}