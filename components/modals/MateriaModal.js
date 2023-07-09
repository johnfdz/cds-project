import React from 'react';
import style from '@/styles/dialog.module.css';

const Dialog = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null;

    return (
        <>
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    
                </div>
            </div>
            <div className={style.dialog}>
                <div className={style.dialog_content} >
                    {children}
                </div>
                <div className={style.dialog_overlay} />

            </div>
        </>
    );
};

export default Dialog;
