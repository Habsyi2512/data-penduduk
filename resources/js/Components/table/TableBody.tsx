import React from 'react';

interface TableBodyProps extends React.HTMLProps<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export default function TableBody({ children, ...props }: TableBodyProps) {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  );
}
