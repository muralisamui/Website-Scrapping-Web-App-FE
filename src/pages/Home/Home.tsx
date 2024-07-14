import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import DataTable from '../../components/DataTable/DataTable'
import './Home.css'

const Home: React.FC = () => {
  const [showBreadCrumb, setShowBreadCrumb] = useState<boolean>(false);
  return (
    <div className='home-page-cont'>
      <SearchBar showBreadCrumb={showBreadCrumb} />
      <DataTable />
    </div>
  )
}

export default Home