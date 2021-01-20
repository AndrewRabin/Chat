var winston = require('winston');
var ENV = process.env.NODE_ENV;

// can be much more flexible than that O_o
function getLogger(module) {

   var path = module.filename.split('/').slice(-2).join('/');

//   return new winston.Logger({
//     transports: [
//       new winston.transports.Console({
//         colorize: true,
//         level: (ENV == 'development') ? 'debug' : 'error',
//         label: path
//       })
//     ]
//   });

    console.log("logger " + path);


    return winston.createLogger({
        //level: 'info',
        //format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
          //
          // - Write all logs with level `error` and below to `error.log`
          // - Write all logs with level `info` and below to `combined.log`
          //
          new winston.transports.Console({
                 colorize: true,
                 //level:'info',
                 //level: (ENV == 'development') ? 'debug' : 'error',
                 label: path
                }),
          //new winston.transports.File({ filename: 'error.log', level: 'error' }),
          //new winston.transports.File({ filename: 'combined.log', label: path }),
        ],
      });
}

module.exports = getLogger;