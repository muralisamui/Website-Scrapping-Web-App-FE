import SearchBar from '../../components/SearchBar/SearchBar'
import { Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import './OverView.css'
import { AvatarBox } from '../../components/AvatarBox/AvatarBox'
import CompanyDetail from '../../components/ComapnyDetails/CompanyDetail'
import Camera from '../../assets/camera.svg'
import DummyScreenShot from '../../assets/DummyScreenShot.png'
import { useQuery } from '@tanstack/react-query'
import { getCompanyData } from '../../hooks/comapanyInfo.api'
import { useParams } from 'react-router-dom'


const OverView = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();

  // api calls
  const { isLoading, error, data: company } = useQuery({
    queryKey: ['company'],
    queryFn: () => getCompanyData(id ? id : null)
  })
  if (isLoading) return <>loading ...</>
  if (error) return <>{error.message}</>

  return (
    <div className='overview-cont-body' >
      <SearchBar showBreadCrumb={true} />
      <Grid container spacing={1} sx={{ marginTop: '2px' }}>
        <Grid item xs={12}>
          <Paper>
            <AvatarBox
              avatarURL={company.logo}
              companyName={company.name}
              desc={company.description}
              phone={company.phone}
              email={company.email}
            />
          </Paper>
        </Grid>
        <Grid item xs={isMobile ? 12 : 3.5}>
          <Paper>
            <CompanyDetail
              website={company.url ? company.url : '---'}
              desc={company.description ? company.description : '---'}
              email={company.email ? company.email : '---'}
              fbURL={company.facebook ? company.facebook : '---'}
              instaURL={company.instagram ? company.instagram : '---'}
              twtURL={company.twitter ? company.twitter : '---'}
              lkdURL={company.linkedin ? company.linkedin : '---'}
              address={company.address ? company.address : '---'}
            />
          </Paper>
        </Grid>
        <Grid item xs={isMobile ? 12 : 8.5}>
          <Paper className='cmpny-scrnsht-cont'>
            <Typography className="cmpny-title-cont">
              <img src={Camera} className="prop-img"></img>
              Screenshot of Webpage
            </Typography>
            <img
              src={DummyScreenShot}
              alt='company website screenshot'
              className='cmpny-scrnsht'
            ></img>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default OverView