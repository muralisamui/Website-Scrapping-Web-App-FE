import { Box, Avatar, Typography, Grid, useTheme, useMediaQuery } from "@mui/material"
import InfoOverView from '../../assets/InfoOverView.svg'
import { Properties } from "../Poperty/Properties"
import './AvatarBox.css'
import Phone from '../../assets/Phone.svg'
import Mail from '../../assets/Mail.svg'

interface AvatarProps {
    avatarURL: string
    companyName: string
    desc: string
    phone: string | number
    email: string
}

export const AvatarBox: React.FC<AvatarProps> = ({ avatarURL, companyName, desc, phone, email }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container spacing={2} className="avatar-cont-body">
            <Grid item xs={3} >
                <Avatar
                    sx={{ bgcolor: 'red' }}
                    variant="square"
                    src={avatarURL}
                    alt='company-logo'
                    className='avatar-img'
                >
                    N
                </Avatar>
            </Grid>
            <Grid item xs={isMobile ? 12 : 4}>
                <Box>
                    <Typography variant='h5' className="cmpny-name-lbl">{companyName}</Typography>
                    <Properties
                        logo={InfoOverView}
                        title='Description'
                        desc={desc}
                    />
                </Box>
            </Grid>
            <Grid item xs={isMobile ? 12 : 4} className="ph-email-cell">
                <Box className='ph-and-email-cont'>
                    <Properties
                        logo={Phone}
                        title='Phone'
                        desc={phone}
                    />
                    <Properties
                        logo={Mail}
                        title='Mail'
                        desc={email}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}