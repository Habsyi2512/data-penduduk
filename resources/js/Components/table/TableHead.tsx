import React from 'react';

interface TableHeadProps extends React.HTMLProps<HTMLTableSectionElement> {
  children: React.ReactNode;
  className?: string; // className optional
}

export default function TableHead({ children, className = '', ...props }: TableHeadProps) {
  return (
    <thead className={` border-0 ${className}`} {...props}>
      {children}
    </thead>
  );
}
