import React, { TdHTMLAttributes } from 'react';

interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export default function Td({ children, className = '', ...props }: TdProps) {
  return (
    <td className={`border border-gray-400 px-4 py-2 ${className}`} {...props}>
      {children}
    </td>
  );
}
