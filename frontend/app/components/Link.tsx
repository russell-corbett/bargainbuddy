"use client";

import { useRouter } from "next/router";
import React from "react";

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function Link({ href, children }: Props) {
	const router = useRouter();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push(href);
	};

	return (
		<a href={href} onClick={handleClick} className="text-black">
			{children}
		</a>
	);
}
