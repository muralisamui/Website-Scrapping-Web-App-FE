import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import DataTable from '../../components/DataTable/DataTable'
import './Home.css'
import { Backdrop, CircularProgress } from '@mui/material'

const Home: React.FC = () => {
  const [showBreadCrumb, setShowBreadCrumb] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className='home-page-cont'>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <SearchBar showBreadCrumb={showBreadCrumb} setLoading={setLoading} />
      <DataTable setLoading={setLoading} />
    </div>
  )
}

export default Home