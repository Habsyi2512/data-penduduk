import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const MoonIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      data-slot="icon"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z"></path>
    </svg>
  );
};

export default MoonIcon;
