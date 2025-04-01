import React, { useState } from 'react';
import {
    Box, Button,TextField, Typography, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions,  Avatar,  List,
    ListItem, ListItemAvatar, ListItemText, Divider, Slide,
    Badge, Chip} from '@mui/material';
import {
    Send as SendIcon,
    Close as CloseIcon,
    Chat as ChatIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';

import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ContactChatBox = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [newMessage, setNewMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('/api/contact', formData);
            setSubmitSuccess(true);
            setStep(5);
            setNewMessage(false);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
        setNewMessage(false);
    };

    const handleClose = () => {
        setOpen(false);
        if (!submitSuccess) {
            setStep(1);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        setStep(1);
        setSubmitSuccess(false);
        setOpen(false);
    };

    return (
        <>
            {/* Floating chat button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 9999
                }}
            >
                <Badge
                    color="error"
                    variant="dot"
                    invisible={!newMessage}
                    overlap="circular"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                        sx={{
                            borderRadius: '50%',
                            minWidth: 0,
                            width: 56,
                            height: 56,
                            boxShadow: 3
                        }}
                    >
                        <ChatIcon fontSize="medium" />
                    </Button>
                </Badge>
            </Box>

            {/* Chat dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        m: 0,
                        height: '70vh',
                        maxHeight: 'none',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '12px 12px 0 0'
                    }
                }}
            >
                <DialogTitle sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6">Contact Support</Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {submitSuccess ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            p: 3,
                            textAlign: 'center'
                        }}>
                            <Avatar sx={{
                                bgcolor: 'success.main',
                                width: 60,
                                height: 60,
                                mb: 2
                            }}>
                                <EmailIcon fontSize="large" />
                            </Avatar>
                            <Typography variant="h6" gutterBottom>
                                Thank You!
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                We've received your message and will contact you soon.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={resetForm}
                                sx={{ mt: 2 }}
                            >
                                Close
                            </Button>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <List sx={{ flex: 1, overflowY: 'auto' }}>
                                {step === 1 && (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="What's your name?"
                                            secondary={
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                    sx={{ mt: 1 }}
                                                />
                                            }
                                        />
                                    </ListItem>
                                )}

                                {step === 2 && (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <EmailIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="What's your email address?"
                                            secondary={
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                    sx={{ mt: 1 }}
                                                />
                                            }
                                        />
                                    </ListItem>
                                )}

                                {step === 3 && (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PhoneIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Phone number (optional)"
                                            secondary={
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+1 (123) 456-7890"
                                                    sx={{ mt: 1 }}
                                                />
                                            }
                                        />
                                    </ListItem>
                                )}

                                {step === 4 && (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ChatIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="How can we help you?"
                                            secondary={
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Type your message here..."
                                                    multiline
                                                    rows={4}
                                                    sx={{ mt: 1 }}
                                                />
                                            }
                                        />
                                    </ListItem>
                                )}
                            </List>

                            <Divider />

                            <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
                                <Box>
                                    {step > 1 && (
                                        <Button
                                            onClick={handlePrev}
                                            disabled={isSubmitting}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    )}
                                </Box>

                                <Box>
                                    {step < 4 ? (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            disabled={!formData.name && step === 1 || !formData.email && step === 2}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting || !formData.message}
                                            endIcon={<SendIcon />}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send'}
                                        </Button>
                                    )}
                                </Box>
                            </DialogActions>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ContactChatBox;