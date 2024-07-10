import SearchIcon from '../../assets/SearchIcon.svg'
import './SearchBar.css'
import { Button } from '@mui/material'

const SearchBar = () => {
    return (
        <div className='search-container-body'>
            <div className='search-container'>
                <img src={SearchIcon} alt='search-icon' />
                <input placeholder='Enter domain name' className='input-box'></input>
            </div>
            <Button className='fetch-btn'>Fetch & Save Details</Button>
        </div>

    )
}

export default SearchBar