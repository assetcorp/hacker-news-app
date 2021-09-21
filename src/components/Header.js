/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  AppBar, Toolbar, Box, LinearProgress, Slide, Container, useScrollTrigger, Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'

const HideOnScroll = props => {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

const Header = props => {
  const router = useRouter()
  const theme = useTheme()
  const classes = useStyles()

  // Component state
  const [loading, setLoading] = React.useState( false )

  React.useEffect( () => {
    const handleRouteChange = ( err, url, loading ) => {
      // console.log( url )
      if ( err.cancelled ) return setLoading( false )
      setLoading( loading )
    }

    router.events.on( 'routeChangeStart', ( err, url ) => handleRouteChange( err, url, true ) )
    router.events.on( 'routeChangeComplete', ( err, url ) => {
      handleRouteChange( err, url, false )
      handleGetTabValueByRoute()
    } )
    router.events.on( 'routeChangeError', ( err, url ) => handleRouteChange( err, url, false ) )

    return () => {
      router.events.off( 'routeChangeStart', ( err, url ) => handleRouteChange( err, url, false ) )
      router.events.off( 'routeChangeComplete', ( err, url ) => {
        handleRouteChange( err, url, false )
        handleGetTabValueByRoute()
      } )
      router.events.off( 'routeChangeError', ( err, url ) => {
        handleRouteChange( err, url, false )
      } )
    }
  }, [] )


  const renderHeader = () => {

    return (
      <Box className={classes.root}>
        <HideOnScroll {...props}>
          <AppBar className={classes.mainAppBar} color="default">
            <Container maxWidth="lg">
              <Toolbar style={{ paddingLeft: 0, paddingRight: 0, }}>
                <Typography className={classes.mainTile} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News App
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </Box>
    )
  }

  return (
    <React.Fragment>
      {
        loading &&
        <Box className={classes.loadingBox}>
          <LinearProgress />
        </Box>
      }
      {renderHeader()}
    </React.Fragment>
  )
}

const drawerWidth = 240

const useStyles = makeStyles( theme => ( {
  main: {
    width: '100%',
  },
  loadingBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2002,
  },
  mainAppBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up( 'sm' )]: {
      width: '100%',
      marginLeft: 0,
    },
    // backgroundColor: props => props.transparentHeder ? 'transparent' : theme.palette.background.paper,
  },
  mainTitle: {
    marginRight: theme.spacing( 5 ),
  },
} ) )

export default Header
