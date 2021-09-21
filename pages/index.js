import React from 'react'
import { Box, Button, Container, Grid, makeStyles, styled, Tab, Tabs, Typography, useTheme } from '@material-ui/core'
import NewsItem from '../src/components/News/NewsItem'
import News from '../src/utils/News'

const NewsClass = new News()
const LIMIT = 10

const Home = () => {
  const classes = useStyles()
  const theme = useTheme()

  // Component State
  const [articleLoading, setArticleLoading] = React.useState( false )
  const [tabValue, setTabValue] = React.useState( 'TOP' )
  const [articles, setArticles] = React.useState( [] )

  const handleTabChange = ( event, newValue ) => {
    setTabValue( newValue || 'TOP' )
  }

  const handleStories = async () => {
    try {
      const storyIds = await NewsClass.getStoryIds( LIMIT, articles.length, tabValue )

      for ( let item of storyIds ) {
        const data = await NewsClass.getItemData( item )
        if ( data ) setArticles( oldArticles => [...oldArticles, data] )
      }

    } catch ( error ) {
      console.error( error )
      alert( 'Failed to load top stories' )
    }
  }

  React.useEffect( () => {
    setArticles( [] )
    handleStories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue] )

  return (
    <Box className={classes.main}>
      <Container maxWidth="lg">
        <Typography variant="h5" align="center" style={{ marginBottom: theme.spacing( 2 ) }}>
          Discover much more!
        </Typography>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          // centered
          value={tabValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary">
          <Tab value="TOP" label="TOP STORIES" />
          <Tab value="ALL" label="ALL STORIES" />
          <Tab value="ASK" label="ASK" />
          <Tab value="SHOW" label="SHOW" />
          <Tab value="JOBS" label="JOBS" />
        </Tabs>
        <Box style={{ paddingRight: theme.spacing( 2 ) }}>
          <Grid container spacing={2} style={{ margin: theme.spacing( 2, 0 ) }}>
            {
              articles.map( ( article, index ) => {
                return (
                  <Grid key={article.id + index} item xs={12} sm={6} md={4}>
                    <NewsItem article={article} />
                  </Grid>
                )
              } )
            }
          </Grid>
          <Box className={classes.loadMoreBox}>
            {
              !!articles.length &&
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleStories()}>
                Load More
              </Button>
            }
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

const useStyles = makeStyles( theme => ( {
  main: {
    width: '100%',
    padding: theme.spacing( 5, 0 )
  },
  loadMoreBox: {
    margin: theme.spacing( 3, 0 ),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
} ) )

export default Home