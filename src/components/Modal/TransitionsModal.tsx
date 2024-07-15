import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #64748B',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};
const buttonStyles = {
    backgroundColor: '#EDE5FF',
    borderRadius: '5px',
    color: '#6C2BD9',

}
interface ModalProps {
    title?: string
    message: string
    onClose: () => void
    isOpen: boolean
}

const TransitionsModal: React.FC<ModalProps> = ({ title, message = 'Something went Wrong !', onClose, isOpen }) => {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    {title &&
                        <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: '#374151' }}>
                            {title}
                        </Typography>
                    }
                    <Typography id="transition-modal-description" sx={{ mt: 2, color: '#64748B' }}>
                        {message}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={onClose} sx={buttonStyles}>Close</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default TransitionsModal;
