import React from "react";

interface NavLinkProps {
	href: string;
	label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
	return (
		<a href={href} className="text-black font-semibold">
			{label}
		</a>
	);
}
