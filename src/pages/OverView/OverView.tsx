import SearchBar from '../../components/SearchBar/SearchBar'
import { Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import './OverView.css'
import { AvatarBox } from '../../components/AvatarBox/AvatarBox'
import CompanyDetail from '../../components/ComapnyDetails/CompanyDetail'
import Camera from '../../assets/camera.svg'
import DummyScreenShot from '../../assets/DummyScreenShot.png'


const OverView = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className='overview-cont-body' >
      <SearchBar showBreadCrumb={true} />
      <Grid container spacing={1} sx={{ marginTop: '2px' }}>
        <Grid item xs={12}>
          <Paper>
            <AvatarBox
              avatarURL='netflix.com'
              companyName='Netflix'
              desc='Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.'
            />
          </Paper>
        </Grid>
        <Grid item xs={isMobile ? 12 : 3.5}>
          <Paper>
            <CompanyDetail
              website={'djshdgvjshfs'}
              desc={'Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.'}
              email={'djshdgvjshfs'}
              fbURL={'djshdgvjshfs'}
              instaURL={'djshdgvjshfs'}
              twtURL={'djshdgvjshfs'}
              lkdURL={'djshdgvjshfs'}
              address={'djshdgvjshfs'}
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