import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import DataTable from '../../components/DataTable/DataTable'
import Pagination from '@mui/material/Pagination'
import { Paper, Typography } from '@mui/material'
import './Home.css'

const Home: React.FC = () => {
  const [showBreadCrumb, setShowBreadCrumb] = useState<boolean>(false);
  return (
    <div className='home-page-cont'>
      <SearchBar showBreadCrumb={showBreadCrumb}/>
      <DataTable setShowNavigation={setShowBreadCrumb} />
      <Paper className='pagination-container'>
        <Typography className='pagination-text'>
          Showing <span style={{ fontWeight: '600' }}>2-10</span > of <span style={{ fontWeight: '600' }}>1000</span>
        </Typography>
        <Pagination count={10} variant="outlined" shape="rounded" className='pagination-count' />
      </Paper>
    </div>
  )
}

export default Home