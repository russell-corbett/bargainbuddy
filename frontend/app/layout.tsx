import './styles/globals.css';
import { ReactNode } from 'react';
import Nav from './components/Nav';  // Navigation component in components folder

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />  {/* Display global navigation bar */}
        <main>{children}</main>
      </body>
    </html>
  );
}
