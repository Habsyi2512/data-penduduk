import React from 'react';

interface TrProps extends React.HTMLProps<HTMLTableRowElement> {
  children: React.ReactNode;
}

export default function Tr({ children, ...props }: TrProps) {
  return (
    <tr {...props}>
      {children}
    </tr>
  );
}
