import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox } from '@mui/material';
import { useState } from 'react';
import Facebook from '../../assets/Facebook.svg'
import Twitter from '../../assets/Twitter.svg'
import LinkedIn from '../../assets/LinkedIn.svg'
import CoptToClipboard from '../../assets/CoptToClipboard.svg'
import ExportCSV from '../../assets/ExportCSV.svg'
import DummyCompLogo from '../../assets/DummyCompLogo.png'
import './DataTable.css'
import { trimString, useCopyToClipboard } from '../../hooks/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { useQuery } from '@tanstack/react-query';
import { getCompanyData } from '../../hooks/companyTable.api';

// function createData(
//     company: string,
//     social: any,
//     desc: string,
//     address: string,
//     phNo: string,
//     email: string
// ) {
//     return { company, social, desc, address, phNo, email };
// }

// const rows = [
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United Stdfgdfgdgdates', '(573)-467-7494', 'contact@airbnb.com'),
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted khsdgbfkjshdbgfkhbsdjkfhbsdhfjksdbfhsbdjfhvbsdjkhfjksh collaboration tools: including video...`, 'San Francisco, United States', '(573)-', 'contact@airbnb.com'),
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-735454-494', 'contact@airbnb.com'),
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
//     createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contsfgsgsdsact@airbnb.com'),

// ];

const columnsHeadings = ['COMPANY', 'SOCIAL PROFILES', 'DESCRIPTION', 'ADDRESS', 'PHONE NO.', 'EMAIL']

const DataTable = () => {
    const [selectedRows, setSelectedRows] = useState(new Set());
    const { copyToClipboard, renderAlert } = useCopyToClipboard();
    const navigate = useNavigate();

    // api calls
    const { isLoading, error, data } = useQuery({
        queryKey: ['companies'],
        queryFn: getCompanyData
    })

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>{error.message}</div>
    const companies = data.items;


    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            const newSelectedRows = new Set(companies.map((_: any, index: number) => index));
            setSelectedRows(newSelectedRows);
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleSelectRow = (index: any) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(index)) {
            newSelectedRows.delete(index);
        } else {
            newSelectedRows.add(index);
        }
        setSelectedRows(newSelectedRows);
    };
    const isSelected = (index: any) => selectedRows.has(index);



    return (
        <>
            <Paper className='bttn-and-count' elevation={1}>
                <span className='rows-count-label'>{selectedRows.size} selected</span>
                <Button className='table-bttns' variant='outlined'>Delete</Button>
                <Button className='table-bttns' variant='outlined' id='export-csv-btn'>
                    <img src={ExportCSV} />
                    Export as CSV
                </Button>
            </Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#F9FAFB' }}>
                        <TableRow>
                            <TableCell align="left" className='check-box-cell'>
                                <Checkbox
                                    indeterminate={selectedRows.size > 0 && selectedRows.size < companies?.length}
                                    checked={selectedRows.size === companies?.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            {
                                columnsHeadings?.map((el) => (
                                    <TableCell key={el} align='left' className='table-heading'>{el}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies?.map((company: any, index: number) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" className='check-box-cell'>
                                    <div className='check-box-cmpny'>
                                        <Checkbox
                                            checked={isSelected(index)}
                                            onChange={() => handleSelectRow(index)}
                                        />
                                        <img
                                            src={company.logo ? company.logo : DummyCompLogo}
                                            style={{ height: '25px', width: '25px', borderRadius: '5px' }}
                                        ></img>
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row" className='cmpny-cell' id='company'>
                                    <div onClick={() => navigate(routes.overView)}>
                                        {trimString(company?.name, 15)}
                                    </div>
                                </TableCell>
                                <TableCell align="left" className='social-icons'>
                                    {company?.facebook &&
                                        <a href={company?.facebook} target='_blank'>
                                            <img src={Facebook} className='fb' alt='facebook-icon' />
                                        </a>
                                    }
                                    {company?.twitter &&
                                        <a href={company?.twitter} target='_blank'>
                                            <img src={Twitter} className='twt' alt='twitter-icon' />
                                        </a>
                                    }
                                    {company?.linkedin &&
                                        <a href={company?.linkedin} target='_blank'>
                                            <img src={LinkedIn} className='lkd' alt='linkedin-icon' />
                                        </a>
                                    }
                                </TableCell>
                                <TableCell align="left" id='desc'>{trimString(company?.description, 65)}</TableCell>
                                <TableCell align="left" id='address'>{trimString(company?.address, 35)}</TableCell>
                                <TableCell align="left" id='ph-no'>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {trimString(company?.phone, 15)}
                                        <img
                                            src={CoptToClipboard}
                                            alt='copy'
                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                            onClick={() => copyToClipboard(company?.phone)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="left" id='email'>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {trimString(company?.email, 20)}
                                        <img
                                            src={CoptToClipboard}
                                            alt='copy'
                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                            onClick={() => copyToClipboard(company?.email)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {renderAlert()}
        </>
    );
}

export default DataTable;
