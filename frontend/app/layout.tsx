"use client";

import "./styles/globals.css";
import Nav from "./components/Nav";
import { ProductsProvider } from "./context/productContext_test";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  // Render the Nav for all routes except for the root ('/')
  const showGlobalNav =
    pathname !== "/" && pathname != "/home" && pathname != "/accountSignIn" && pathname != "/contact" && pathname != "/team";
  const excludeGlobals = pathname === "/home" || pathname === "/" || pathname === "/contact" || pathname === "/team";

  return (
    <html lang="en">
      <body className={!excludeGlobals ? "apply-globals" : ""}>
        <ProductsProvider>
          {showGlobalNav && <Nav />}
          <main>{children}</main>
        </ProductsProvider>
      </body>
    </html>
  );
}
