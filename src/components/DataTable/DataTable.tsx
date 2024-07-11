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
import './DataTable.css'
import { trimString, useCopyToClipboard } from '../../hooks/hooks';
import ExportCSV from '../../assets/ExportCSV.svg'
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';

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
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United Stdfgdfgdgdates', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted khsdgbfkjshdbgfkhbsdjkfhbsdhfjksdbfhsbdjfhvbsdjkhfjksh collaboration tools: including video...`, 'San Francisco, United States', '(573)-', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-735454-494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contact@airbnb.com'),
    createData('Airbnb', 159, `Modernize workflows with Zoom's trusted collaboration tools: including video...`, 'San Francisco, United States', '(573)-467-7494', 'contsfgsgsdsact@airbnb.com'),

];

const columnsHeadings = ['COMPANY', 'SOCIAL PROFILES', 'DESCRIPTION', 'ADDRESS', 'PHONE NO.', 'EMAIL']

interface DataTableProps{
    setShowNavigation?: (value: boolean) => void;
}

const DataTable:React.FC<DataTableProps> = ({setShowNavigation}) => {
    const [selectedRows, setSelectedRows] = useState(new Set());
    const { copyToClipboard, renderAlert } = useCopyToClipboard();
    const navigate = useNavigate()

    const handleSelectAll = (event: any) => {
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
                            <TableCell align="left">
                                <Checkbox
                                    indeterminate={selectedRows.size > 0 && selectedRows.size < rows.length}
                                    checked={selectedRows.size === rows.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            {
                                columnsHeadings.map((el) => (
                                    <TableCell key={el} align='left' className='table-heading'>{el}</TableCell>
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
                                <TableCell component="th" scope="row" id='company'>
                                    <div onClick={()=>navigate(routes.overView)}>
                                        {trimString(row.company, 15)}
                                    </div>
                                </TableCell>
                                <TableCell align="left" className='social-icons'>
                                    <img src={Facebook} className='fb' />
                                    <img src={Twitter} className='twt' />
                                    <img src={LinkedIn} className='lkd' />
                                </TableCell>
                                <TableCell align="left" id='desc'>{trimString(row.desc, 65)}</TableCell>
                                <TableCell align="left" id='address'>{trimString(row.address, 35)}</TableCell>
                                <TableCell align="left" id='ph-no'>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {trimString(row.phNo, 15)}
                                        <img
                                            src={CoptToClipboard}
                                            alt='copy'
                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                            onClick={() => copyToClipboard(row.phNo)}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="left" id='email'>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        {trimString(row.email, 20)}
                                        <img
                                            src={CoptToClipboard}
                                            alt='copy'
                                            style={{ cursor: 'pointer', marginLeft: '5px' }}
                                            onClick={() => copyToClipboard(row.email)}
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
