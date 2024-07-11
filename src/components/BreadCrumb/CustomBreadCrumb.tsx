import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronRight from '../../assets/ChevronRight.svg'

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const CustomBreadCrumb = () => {
    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/"
            onClick={handleClick}
            sx={{fontWeight:600}}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={handleClick}
            sx={{fontWeight:600}}
        >
            Netflix
        </Link>
    ];

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            separator={
                <img src={ChevronRight}/>
            }
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
}

export default CustomBreadCrumb