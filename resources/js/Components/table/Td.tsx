import React, { TdHTMLAttributes } from 'react';

interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export default function Td({ children, className = '', ...props }: TdProps) {
  return (
    <td className={`border-none text-gray-600 font-medium px-2 truncate py-2 ${className}`} {...props}>
      {children}
    </td>
  );
}
