import express                   from 'express'
import React                     from 'react'
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router'
import { createLocation }        from 'history'
import routes                    from './src/routes'
import { Provider }              from 'react-redux'
import reducer                   from './src/reducers/reducer'
import { createStore}            from 'redux'
import path                      from 'path'


const app = express()


app.use( (req, res) => {
    const location = createLocation(req.url)
    const store    = createStore(reducer)

    match({ routes: routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (!renderProps) {
      return res.status(404).end('Not found')
    }

    const componentHTML = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>)

    const initialState = store.getState()
    res.send(renderPage(componentHTML, initialState))


  })
})

function renderPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Things to do</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script type="application/javascript" src="/dist/bundle.js"></script>
      <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
    </body>
    </html>
  `
}



export default app
