import { AlertTriangle } from 'lucide-react';
import Modal from '@/components/Modal';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message: string;
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm',
    message,
}: ConfirmDialogProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle size={20} className="text-red-600" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
}
