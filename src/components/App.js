import React from 'react'
import { CssBaseline, useMediaQuery, Box } from '@material-ui/core'
import { ThemeProvider, createTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { blue, pink } from '@material-ui/core/colors'

const globalFont = {
  // eslint-disable-next-line quotes
  fontFamily: `Bitter, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji'`,
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
}

const App = props => {
  // Configure Material-UI theme
  const prefersDarkMode = useMediaQuery( '(prefers-color-scheme: dark)' )
  const mainTheme = React.useMemo(
    () =>
      createTheme( {
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: blue,
          secondary: pink,
        },
        typography: {
          fontFamily: globalFont.fontFamily,
        },
        // shadows: Array( 25 ).fill( 'none' ),
        overrides: {
          MuiCssBaseline: {
            '@global': {
              '@font-face': [globalFont],
            },
          },
          MuiAppBar: {
            root: {
              boxShadow: 'none'
            }
          },
        }
      } ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefersDarkMode]
  )
  const theme = responsiveFontSizes( mainTheme )
  const classes = useStyles()

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display='flex' flexDirection='column' minHeight='100vh'>
          <Box className={classes.main}>
            <Box className={classes.cover}>
              {props.children}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  )
}

const useStyles = makeStyles( () => ( {
  main: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cover: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
  },
} ) )

App.propTypes = {
  children: PropTypes.any
}

export default App
