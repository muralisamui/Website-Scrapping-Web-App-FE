import { Box, Typography } from '@mui/material'
import React from 'react'
import { Properties } from '../Poperty/Properties'
import InfoOverView from '../../assets/InfoOverView.svg'
import './CompanyDetails.css'
import FacebookURL from '../../assets/FacebookURL.svg'
import InstaURL from '../../assets/FacebookURL.svg'
import TwtURL from '../../assets/TwtURL.svg'
import LkdURL from '../../assets/LkdURL.svg'
import Globe from '../../assets/Globe.svg'
import Location from '../../assets/Location.svg'
// import FacebookURL from '../../assets/FacebookURL.svg'


interface CompanyDetailsProps {
    website: string
    desc: string
    email: string
    fbURL: string
    instaURL: string
    twtURL: string
    lkdURL: string
    address: string
}
const CompanyDetail: React.FC<CompanyDetailsProps> = ({
    website,
    desc,
    email,
    fbURL,
    instaURL,
    twtURL,
    lkdURL,
    address,
}) => {
    return (
        <Box className='company-dtls-body'>
            <Typography className='cmpny-dtls-label'>Company Details</Typography>
            <Box className='props-lbls'>
                <Properties
                    logo={Globe}
                    title='Website'
                    desc={website}
                />
                <Properties
                    logo={InfoOverView}
                    title='Description'
                    desc={desc}
                />
                <Properties
                    logo={Location}
                    title='Email'
                    desc={email}
                />
                <Properties
                    logo={FacebookURL}
                    title='Facebook'
                    desc={fbURL}
                />
                <Properties
                    logo={InstaURL}
                    title='Instagram'
                    desc={instaURL}
                />
                <Properties
                    logo={TwtURL}
                    title='Twitter'
                    desc={twtURL}
                />
                <Properties
                    logo={LkdURL}
                    title='LinkedIn'
                    desc={lkdURL}
                />
                <Properties
                    logo={Location}
                    title='Address'
                    desc={address}
                />
            </Box>
        </Box>
    )
}

export default CompanyDetail