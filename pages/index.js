import React from 'react'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'

const Home = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Container maxWidth="lg">

      </Container>
    </Box>
  )
}

const useStyles = makeStyles( theme => ( {
  root: {
    width: '100%',
    height: '100%',
  },
} ) )

export default Home