import { useEffect, useRef } from "react";
import BaseModal from "./BaseModal";

const RenameModal = ({
    open,
    title = "Rename",
    initialValue = "",
    setValue,
    onSave,
    onCancel,
    loading = false,
    placeholder = "Type new name..."
}) => {
    const inputRef = useRef(null);

    const children = (
        <input
            ref={inputRef}
            value={initialValue}
            onChange={(e) => setValue(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            placeholder={placeholder}
        />
    );

    useEffect(() => {
        if (!open) return;

        inputRef.current?.focus();
        inputRef.current?.select();
    }, [open]);

    return (
        <BaseModal
            open={open}
            title={title}
            children={children}
            onClose={onCancel}
            onConfirm={onSave}
            confirmingText="Saving..."
            confirmText="Save"
            loading={loading}
        />
    );
};

export default RenameModal;