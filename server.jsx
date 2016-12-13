import express                   from 'express'
import React                     from 'react'
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router'
import { createLocation }        from 'history'
import routes                    from './src/routes'
import { Provider }              from 'react-redux'
import configureStore            from './src/redux/configureStore'
import path                      from 'path'
import cookieParser              from 'cookie-parser'
import bodyParser                from 'body-parser'

import users from './routes/users'
import auth from './routes/auth'

const app = express()




app.use(cookieParser())

app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/auth', auth)


app.use('/*', (req, res) => {
    const location = createLocation(req.url)
    const store = configureStore()
    const state = store.getState()
    console.log(state)
    match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      return res.status(404).end('Not found')
    }

    const componentHTML = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)


    res.send(renderPage(componentHTML, state))

  })

})



const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/'

function renderPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Things to do</title>
      <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
    </head>
    <body>
      <div id="app">${html}</div>
      <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
    </body>
    </html>
  `
}



export default app
