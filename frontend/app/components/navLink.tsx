import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Link } from './Link';

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};

import { ReactNode } from 'react';

function NavLink({ children, href, exact, ...props }: { children: ReactNode, href: string, exact?: boolean, [key: string]: any }) {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    
    if (isActive) {
        props.className += ' active';
    }

    return <Link href={href} {...props}>{children}</Link>;
}