import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronRight from '../../assets/ChevronRight.svg'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../routes/routes';

const CustomBreadCrumb = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { id, company } = params;

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        url: string
    ) => {
        event.preventDefault();
        if (location.pathname !== url) {
            navigate(url)
        }
    }
    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/"
            onClick={(e) => handleClick(e, routes.home)}
            sx={{ fontWeight: 600 }}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={(e) => handleClick(e, `${routes.overView}/${company}/${id}`)}
            sx={{ fontWeight: 600 }}
        >
            {company}
        </Link>
    ];

    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            separator={
                <img src={ChevronRight} />
            }
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
}

export default CustomBreadCrumb