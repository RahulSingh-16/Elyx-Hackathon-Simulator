
import React from 'react';

const ElyxLogo: React.FC = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.54 31.6C10.5 31.6 7.14 30.16 4.46 27.28C1.78 24.4 0.44 20.88 0.44 16.72C0.44 12.64 1.78 9.16 4.46 6.28C7.14 3.4 10.5 1.96 14.54 1.96C17.58 1.96 20.24 2.76 22.52 4.36V10.48C20.62 9.06 18.28 8.35 15.5 8.35C12.96 8.35 10.96 9.11 9.5 10.63C8.04 12.15 7.31 14.17 7.31 16.69C7.31 19.21 8.04 21.21 9.5 22.69C10.96 24.17 12.96 24.91 15.5 24.91C18.28 24.91 20.62 24.2 22.52 22.78V28.9C20.24 30.5 17.58 31.6 14.54 31.6Z" fill="#2563EB" />
    <path d="M34.333 2.95H27.493V31H34.333V2.95Z" fill="#2563EB" />
    <path d="M57.6969 2.95H50.8569V22.45L42.2169 2.95H34.8969V31H41.7369V11.23L50.5569 31H57.6969V2.95Z" transform="translate(8, 0) scale(0.9)" fill="#2563EB" />
    <path d="M96.166 31L84.826 16.84L95.746 3H103.846L93.166 16.6L104.326 31H96.166Z" fill="#2563EB" />
    <path d="M82.846 3L71.506 17.16L82.426 31H90.526L79.846 17.4L88.966 3H82.846Z" fill="#2563EB" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <ElyxLogo />
      </div>
    </header>
  );
};

export default Header;
