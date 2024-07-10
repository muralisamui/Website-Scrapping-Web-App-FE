import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import DataTable from '../../components/DataTable/DataTable'
import Pagination from '@mui/material/Pagination'
import { Box, Typography } from '@mui/material'
import './Home.css'

const Home: React.FC = () => {
  return (
    <div className='home-page-cont'>
      <SearchBar />
      <DataTable />
      <div className='pagination-container'>
        <Typography>Showing 2-10 of 1000</Typography>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </div>
    </div>
  )
}

export default Home