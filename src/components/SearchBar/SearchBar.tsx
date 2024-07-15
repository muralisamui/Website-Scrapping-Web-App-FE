import SearchIcon from '../../assets/SearchIcon.svg'
import './SearchBar.css'
import { Button } from '@mui/material'
import CustomBreadCrumb from '../BreadCrumb/CustomBreadCrumb'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { scrapeCompanyData } from '../../hooks/companyTable.api';
import TransitionsModal from '../Modal/TransitionsModal';

interface SearchBarProps {
    showBreadCrumb: boolean;
    setLoading: (loading: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ showBreadCrumb, setLoading }) => {
    const [urlString, setURLString] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: scrapeCompanyData,
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: () => {
            // Invalidate and refetch the companies query to refresh the DataTable
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            setURLString('');
            setLoading(false);
        },
        onError: (error) => {
            setURLString('');
            setErrorMessage(error.message);
            setLoading(false)
        }
    });

    const handleFetch = () => {
        mutation.mutate(urlString);
    };

    const handleCloseModal = () => {
        setErrorMessage(null);
    };

    return (
        <div className='search-container-body'>
            <div className='search-input-and-bttn'>
                <div className='search-container'>
                    <img src={SearchIcon} alt='search-icon' />
                    <input
                        value={urlString}
                        placeholder='Enter domain name'
                        className='input-box'
                        onChange={(e) => setURLString(e.target.value)}
                    ></input>
                </div>
                <Button
                    className='fetch-btn'
                    onClick={handleFetch}
                >
                    Fetch & Save Details
                </Button>
            </div>
            {errorMessage &&
                <TransitionsModal
                    message={errorMessage}
                    onClose={handleCloseModal}
                    isOpen={!!errorMessage}
                />
            }
            {showBreadCrumb && <CustomBreadCrumb />}
        </div>
    )
}

export default SearchBar