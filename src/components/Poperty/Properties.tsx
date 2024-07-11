import { Box, Typography } from "@mui/material"
import './Properties.css'

interface Propertyprops {
    logo: any
    title: string
    desc: string
}
export const Properties: React.FC<Propertyprops> = ({ logo, title, desc }) => {
    return (
        <Box>
            <Typography className="title-cont">
                <img src={logo} className="prop-img"></img>
                {title}
            </Typography>
            <Typography className="prop-desc-text">
                {desc}
            </Typography>
        </Box>
    )
}