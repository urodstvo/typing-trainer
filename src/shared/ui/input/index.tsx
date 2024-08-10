import clsx from 'clsx';
import { forwardRef } from 'react';

import './input.module.css';

type InputProps = {} & React.ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
    return <input {...props} className={clsx(props.className)} ref={ref} />;
});
