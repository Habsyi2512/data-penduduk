import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  htmlFor: string; // memastikan bahwa properti htmlFor disediakan
}

export default function Label({ className, htmlFor, ...props }: LabelProps) {
  return (
    <label {...props} htmlFor={htmlFor} className={`font-inter font-medium text-blue-500 dark:text-gray-400 ${className}`}>
      {props.children}
    </label>
  );
}
