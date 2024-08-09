import clsx from 'clsx';

import styles from './button.module.css';

type ButtonProps = {
    children?: React.ReactNode;
    size?: 'icon' | 'default';
    variant?: 'ghost' | 'secondary' | 'transparent' | 'primary';
} & React.ComponentProps<'button'>;

export const Button = ({ children, size = 'default', variant = 'primary', ...props }: ButtonProps) => {
    return (
        <button {...props} className={clsx(props.className, styles[variant], styles[size])}>
            {children}
        </button>
    );
};
