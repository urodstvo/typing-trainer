import { useOnClickOutside } from '@/shared/hooks/';
import { CancelIcon } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

type ModalProps = {
    children: React.ReactNode;
    title?: string;
    isOpened: boolean;
    onClose: () => void;
};

const ModalBase = ({ children, title = '', onClose }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, () => onClose());

    return (
        <div className={styles.modal} ref={modalRef}>
            <header>
                <Button variant="ghost" size="icon" onClick={onClose} className={styles.closeButton} aria-label="Close">
                    <CancelIcon width={20} height={20} />
                </Button>
                <h2 className={styles.modalTitle}>{title}</h2>
            </header>
            <hr className={styles.divider} />
            <div className={styles.modalBody}>{children}</div>
        </div>
    );
};

const Overlay = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.overlay}>{children}</div>;
};

export const Modal = (props: ModalProps) => {
    if (!props.isOpened) return null;
    return createPortal(
        <Overlay>
            <ModalBase {...props} />
        </Overlay>,
        document.querySelector('#modal')!,
    );
};
