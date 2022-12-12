const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig)
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(webpackDevMiddleware(compiler,{
  publicPath: webpackConfig.output.publicPath,
}));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

// app.use((req, res, next) => {
//   const error = new Error(`router for ${req.method} ${req.url} is not exist.`)
//   error.status = 404;
//   next(error);
// });

app.use((err, req, res) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Internal server error.';
  res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});



app.listen(app.get('port'), () => {
  console.log(`server is running http://localhost:${process.env.PORT || 3000}`);
});
