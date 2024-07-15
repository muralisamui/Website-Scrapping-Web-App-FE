import { Box, Typography } from "@mui/material"
import './Properties.css'

interface Propertyprops {
    logo: any
    title: string
    desc: string | number
    isClickable?: boolean
}
export const Properties: React.FC<Propertyprops> = ({ logo, title, desc, isClickable }) => {
    return (
        <Box>
            <Typography className="title-cont">
                <img src={logo} className="prop-img"></img>
                {title}
            </Typography>
            <Typography className="prop-desc-text"
                sx={{
                    color: isClickable ? '#6C2BD9' : '#000000',
                    cursor: isClickable ? 'pointer' : 'default'
                }}>
                {desc}
            </Typography>
        </Box>
    )
}