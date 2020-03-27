// var queue = require('../initializers/queue');
// var config = require('../config/default');
var uploader = require("../lib/uploader");
var kue = require("kue");
let queue = kue.createQueue({
  prefix: "test-queue-qddddd",
  redis: {
    port: 6379,
    host: "localhost",
    //   auth: 'password',
    db: 3, // if provided select a non-default redis db
    options: {
      // see https://github.com/mranney/node_redis#rediscreateclient
    }
  }
});

const sendEmail = (job, ctx, done) => {
  setTimeout(function() {
    done();
  }, 1000);
};

const processFile = (params, cb) => {
  if (!this.job) {
    this.job = {
      log() {
        console.log(arguments);
      }
    };
  }
  let i = 0;
  // let intervalObject = setInterval(() => {
  //   this.job.log(i++);
  // }, 1000);
  setTimeout(function() {
    // clearInterval(intervalObject);
    cb();
  }, 10000);
};

const options = {
  queue,
  fileFormats: [".zip"],
  numberOfProcess: {
    itemsManagerProcess: 1,
    fileBatchProcess: 1,
    emailProcess: 2
  },
  processNames:{
    manager:'manager-queue',//queue name for manager process
    processor:'processor-queue',//queue name for file processor process
 },
  items: [
    {
      optId: '1',
      name: 'Assael 1',
      priority: 'normal',
      type: 'sftp',
      ftp: {
        host: 'optfeeds.optcentral.com',
        port: 22,
        user: 'assael',
        pass: 'assaelopt123',
        password: 'assaelopt123'
      },
      dir: {
        upload: '/assael/Assael_Catalog_Imagery/',
        enqueued: '/assael/Assael_Catalog_Imagery/enqueued/',
        processing: '/assael/Assael_Catalog_Imagery/processing/',
        error: '/assael/Assael_Catalog_Imagery/error/',
        processed: '/assael/Assael_Catalog_Imagery/processed/',
        ignore: '/assael/Assael_Catalog_Imagery/ignore/',
        backup: '/assael/Assael_Catalog_Imagery/backup/'
      }
    },
    {
      optId: '2',
      name: 'Assael 2',
      priority: 'normal',
      type: 'sftp',
      ftp: {
        host: 'optfeeds.optcentral.com',
        port: 22,
        user: 'assael',
        pass: 'assaelopt123',
        password: 'assaelopt123'
      },
      dir: {
        upload: '/assael/Assael_Catalog_Imagery/',
        enqueued: '/assael/Assael_Catalog_Imagery/enqueued/',
        processing: '/assael/Assael_Catalog_Imagery/processing/',
        error: '/assael/Assael_Catalog_Imagery/error/',
        processed: '/assael/Assael_Catalog_Imagery/processed/',
        ignore: '/assael/Assael_Catalog_Imagery/ignore/',
        backup: '/assael/Assael_Catalog_Imagery/backup/'
      }
    },
    {
      optId: '3',
      name: 'Assael 3',
      priority: 'normal',
      type: 'sftp',
      ftp: {
        host: 'optfeeds.optcentral.com',
        port: 22,
        user: 'assael',
        pass: 'assaelopt123',
        password: 'assaelopt123'
      },
      dir: {
        upload: '/assael/Assael_Catalog_Imagery/',
        enqueued: '/assael/Assael_Catalog_Imagery/enqueued/',
        processing: '/assael/Assael_Catalog_Imagery/processing/',
        error: '/assael/Assael_Catalog_Imagery/error/',
        processed: '/assael/Assael_Catalog_Imagery/processed/',
        ignore: '/assael/Assael_Catalog_Imagery/ignore/',
        backup: '/assael/Assael_Catalog_Imagery/backup/'
      }
    }

  ],
  cbemailfunction: sendEmail,
  customCallback: processFile,
  filePath: __dirname,
  kue
};

uploader(options);
