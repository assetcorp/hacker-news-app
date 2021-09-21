
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'


const MainApp = props => {
  const classes = useStyles()

  return (
    <main className={classes.container}>
      {props.children}
    </main>
  )
}

const drawerWidth = 240

const useStyles = makeStyles( theme => ( {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(100vh - ${( theme.mixins.toolbar.minHeight + theme.spacing( 1 ) )}px)`,
    width: '100%',
    marginTop: theme.spacing( 8 ),
    [theme.breakpoints.up( 'sm' )]: {
      width: '100%',
      marginLeft: 0,
    },
    [theme.breakpoints.down( 'xs' )]: {
      marginTop: theme.spacing( 7 ),
    }
  },
} ) )

MainApp.propTypes = {
  children: PropTypes.any.isRequired,
}

export default MainApp
