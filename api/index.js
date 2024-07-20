//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
// const { conn } = require('./src/db.js');
require('dotenv').config();//conexion
const { PORT } = process.env; //destructuring

// Syncing all the models at once.
// conn.sync({ force: true }).then(() => { 
  // Si esta en true se crea en la db cada vez que se levanta el servidor
  // Si esta en false se crea una sola vez y se queda guardado
  server.listen(PORT, () => {
    // console.log('%s listening at', process.env.PORT); // eslint-disable-line no-console
    console.log(`Server is listening on port ${PORT}`);
  });
// });
