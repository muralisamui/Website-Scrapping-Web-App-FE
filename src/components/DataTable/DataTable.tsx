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
import './DataTable.css'

function createData(
    company: string,
    social: any,
    desc: string,
    address: string,
    phNo: string,
    email: string
) {
    return { company, social, desc, address, phNo, email };
}

const rows = [
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),

];

const columnsHeadings = ['COMPANY', 'SOCIAL PROFILES', 'DESCRIPTION', 'ADDRESS', 'PHONE NO.', 'EMAIL']

export default function DataTable() {
    const [selectedRows, setSelectedRows] = useState(new Set());

    const handleSelectAll = (event: any) => {
        ``
        if (event.target.checked) {
            const newSelectedRows = new Set(rows.map((_, index) => index));
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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ border: 0 }}>
                        <TableCell>{selectedRows.size} selected</TableCell>
                        <TableCell>
                            <Button sx={{ textTransform: 'none' }} variant='outlined'>Delete</Button>
                        </TableCell>
                        <TableCell>
                            <Button sx={{ textTransform: 'none' }} variant='outlined'>Export as CSV</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="left">
                            <Checkbox
                                indeterminate={selectedRows.size > 0 && selectedRows.size < rows.length}
                                checked={selectedRows.size === rows.length}
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                        {
                            columnsHeadings.map((el) => (
                                <TableCell key={el} align='left'>{el}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                <Checkbox
                                    checked={isSelected(index)}
                                    onChange={() => handleSelectRow(index)}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.company}
                            </TableCell>
                            <TableCell align="left" className='social-icons'>
                                <img src={Facebook} className='fb' />
                                <img src={Twitter} className='twt' />
                                <img src={LinkedIn} className='lkd' />
                            </TableCell>
                            <TableCell align="left">{row.desc}</TableCell>
                            <TableCell align="left">{row.address}</TableCell>
                            <TableCell align="left">{row.phNo}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
