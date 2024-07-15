import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Button, Checkbox, CircularProgress, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import Facebook from '../../assets/Facebook.svg'
import Twitter from '../../assets/Twitter.svg'
import LinkedIn from '../../assets/LinkedIn.svg'
import CoptToClipboard from '../../assets/CoptToClipboard.svg'
import ExportCSV from '../../assets/ExportCSV.svg'
import DummyCompLogo from '../../assets/DummyCompLogo.png'
import './DataTable.css'
import { trimString, useCopyToClipboard } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCompany, getCompanyTableData } from '../../hooks/companyTable.api';
import TransitionsModal from '../Modal/TransitionsModal';

interface DataTableProps {
    setLoading: (loading: boolean) => void;
}

const DataTable: React.FC<DataTableProps> = ({ setLoading }) => {
    const columnsHeadings = ['COMPANY', 'SOCIAL PROFILES', 'DESCRIPTION', 'ADDRESS', 'PHONE NO.', 'EMAIL']
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { copyToClipboard, renderAlert } = useCopyToClipboard();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    // api calls using react-query
    const { isLoading, error, data } = useQuery({
        queryKey: ['companies', { currentPage }],
        queryFn: () => getCompanyTableData(currentPage, 10), // Initial fetch for page 1 and limit 10
    })

    // Mutation for deleting a company record
    const mutation = useMutation({
        mutationFn: deleteCompany,
        onMutate: () => setLoading(true),
        onSuccess: () => {
            // Refetch the company data after deletion
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            setLoading(false)
        }
    });

    if (isLoading) return (<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
    </Backdrop>)

    const handleCloseModal = () => {
        setErrorMessage(null);
    };
    if (error) return <TransitionsModal message={error.message} onClose={handleCloseModal} isOpen={!!errorMessage} />
    const companies = data?.items;
    const meta = data?.meta;

    const handleSelectAll = (event: any) => {
        if (event.target.checked) {
            const newSelectedRows = new Set(companies.map((company: any) => company.id));
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
    const isSelected = (id: any) => selectedRows.has(id);

    // Handling page change event to update current page state
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
    const handleDelete = (ids: Set<number>) => {
        ids.forEach((el) => {
            mutation.mutate(el);
        })
    };

    return (
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper className='bttn-and-count' elevation={1}>
                <span className='rows-count-label'>{selectedRows.size} selected</span>
                <Button
                    className='table-bttns'
                    variant='outlined'
                    onClick={() => handleDelete(selectedRows)}
                >
                    {selectedRows.size > 1 ? 'Delete All' : 'Delete'}
                </Button>
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
                                            checked={isSelected(company?.id)}
                                            onChange={() => handleSelectRow(company?.id)}
                                        />
                                        <img
                                            src={company.logo ? company.logo : DummyCompLogo}
                                            style={{ height: '25px', width: '25px', borderRadius: '5px' }}
                                        ></img>
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row" className='cmpny-cell' id='company'>
                                    <div onClick={() => navigate(`${routes.overView}/${company?.name}/${company?.id}`)}>
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
            <Paper className='pagination-container'>
                <Typography className='pagination-text'>
                    Showing <span style={{ fontWeight: '600' }}>{meta.currentPage * meta.itemsPerPage - (meta.itemsPerPage - 1)}-{Math.min(meta.currentPage * meta.itemsPerPage, meta.totalItems)}</span > of <span style={{ fontWeight: '600' }}>{meta.totalItems}</span>
                </Typography>
                <Pagination
                    count={meta.totalPages}
                    page={meta.currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    className='pagination-count'
                />
            </Paper>
            {renderAlert()}
        </>
    );
}

export default DataTable;
