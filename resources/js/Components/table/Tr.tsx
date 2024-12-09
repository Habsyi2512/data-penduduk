import React from 'react';

interface TrProps extends React.HTMLProps<HTMLTableRowElement> {
  children: React.ReactNode;
}

export default function Tr({ children, className='', ...props }: TrProps) {
  return (
    <tr {...props} className={`border-b cursor-pointer border-gray-300 ${className}`}>
      {children}
    </tr>
  );
}
