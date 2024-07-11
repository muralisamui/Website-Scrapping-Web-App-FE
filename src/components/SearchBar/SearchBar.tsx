import SearchIcon from '../../assets/SearchIcon.svg'
import './SearchBar.css'
import { Button } from '@mui/material'
import CustomBreadCrumb from '../BreadCrumb/CustomBreadCrumb'

interface SearchBarProps {
    showBreadCrumb: boolean;
}

const SearchBar : React.FC<SearchBarProps> = ({ showBreadCrumb }) => {
    return (
        <div className='search-container-body'>
            <div className='search-input-and-bttn'>
                <div className='search-container'>
                    <img src={SearchIcon} alt='search-icon' />
                    <input placeholder='Enter domain name' className='input-box'></input>
                </div>
                <Button className='fetch-btn'>Fetch & Save Details</Button>
            </div>
            {showBreadCrumb && <CustomBreadCrumb />}
        </div>
    )
}

export default SearchBar