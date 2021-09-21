import React from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Link, Typography, useTheme } from '@material-ui/core'
import { CommentOutlined, FavoriteOutlined } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { blue } from '@material-ui/core/colors'
import moment from 'moment'

const NewsItem = ( { article } ) => {
  const theme = useTheme()

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: blue[500] }} aria-label="user">
            {article.by ? article.by.substr( 0, 1 ).toUpperCase() : 'N/A'}
          </Avatar>
        }
        title={moment( article.time ).format( 'MMMM Do YYYY, h:mm:ss a' )}
        subheader={`By ${article.by}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {article.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Chip icon={<FavoriteOutlined />} label={article.score} variant="outlined" title={`${article.score} likes`} />
        <span style={{ marginLeft: theme.spacing( 2 ) }} />
        <Chip icon={<CommentOutlined />} label={article.descendants} variant="outlined" title={`${article.descendants} comments`} />
        <span style={{ marginLeft: theme.spacing( 2 ), flexGrow: 1 }} />
        <Link href={article.url} target="_blank" rel="noreferrer noopener">
          <Button variant="contained" color="primary">
            Read
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

NewsItem.propTypes = {
  article: PropTypes.shape({
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })
}

export default NewsItem