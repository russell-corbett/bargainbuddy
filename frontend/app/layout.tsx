"use client";

import './styles/globals.css';
import Nav from './components/Nav';
import { ProductsProvider } from './context/productContext_test';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <body>
              <ProductsProvider>
                  {/* Provide the products context to the whole app */}
                  <Nav />
                  <main>{children}</main>
              </ProductsProvider>
          </body>
      </html>
  );
}