import { useState } from 'react';
import { Snackbar } from '@mui/material';

export const useCopyToClipboard = () => {
    const [alert, setAlert] = useState({ message: '', severity: 'success' });
    const [open, setOpen] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setAlert({ message: 'Copied to clipboard', severity: 'success' });
            setOpen(true);
        }).catch(err => {
            setAlert({ message: 'Failed to copy', severity: 'error' });
            setOpen(true);
        });
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const renderAlert = () => (
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message={alert.message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    );

    return { copyToClipboard, renderAlert };
};

export function trimString(input: string, maxLength: number, addEllipsis: boolean = true): string {
    if(!input) return '';
    if (input.length <= maxLength) {
        return input;
    }

    const trimmedString = input.substring(0, maxLength);
    return addEllipsis ? trimmedString + '...' : trimmedString;
}

