// components/CustomModal.tsx
"use client";

import React, { ReactNode, CSSProperties } from "react";
import { Modal } from "antd";

export interface CustomModalProps {
    /** Whether the modal is visible */
    visible: boolean;
    /** Called when the user clicks the close button or the mask (if enabled) */
    onClose: () => void;
    /** Width of the drawer (string like "50%" or number of pixels) */
    width?: string | number;
    /** Height of the modal body (string like "400px" or number). If provided, body scrolls */
    height?: string | number;
    /** Optional header content */
    header?: ReactNode;
    /** Optional footer content */
    footer?: ReactNode;
    /** Main body content */
    children?: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onClose,
    width = "50%",
    height,
    header,
    footer,
    children,
}) => {
    // if height is specified, make the body scrollable
    const bodyStyle: CSSProperties | undefined = height
        ? { height: `calc(${height} - 60px)`, overflowY: "auto" }
        : undefined;

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={width}
            style={height ? { top: 20 } : bodyStyle}
            closable
            maskClosable={false}
        >
            <div className="flex flex-col h-full">
                {header && <div className="border-b pb-2 mb-4">{header}</div>}
                <div className="flex-1">{children}</div>
                {footer && <div className="border-t pt-2 mt-4">{footer}</div>}
            </div>
        </Modal>
    );
};

export default CustomModal;
