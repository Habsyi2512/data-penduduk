import React from 'react';

interface ThProps extends React.HTMLProps<HTMLTableHeaderCellElement> {
  children: React.ReactNode;
}

export default function Th({ children, ...props }: ThProps) {
  return (
    <th className="border border-gray-400 px-4 py-2 font-bold" {...props}>
      {children}
    </th>
  );
}
