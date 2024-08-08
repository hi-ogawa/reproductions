import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const mainPre = document.querySelector('.main');
const workerPre = document.querySelector('.worker');

const log = (...args) => {
  console.log(...args);
  mainPre.textContent += `${args.join(' ')}\n`
}
const error = (...args) => {
  console.error(...args);
  mainPre.textContent += `${args.join(' ')}\n`
}

const workerLog = (...args) => {
  console.log(...args);
  workerPre.textContent += `${args.join(' ')}\n`
}
const workerError = (...args) => {
  console.error(...args);
  workerPre.textContent += `${args.join(' ')}\n`
}

const start = function (sqlite3) {
  log('Running SQLite3 version', sqlite3.version.libVersion);
  const db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
  try {
    log('Creating a table...');
    db.exec('CREATE TABLE IF NOT EXISTS t(a,b)');
    log('Insert some data using exec()...');
    for (let i = 20; i <= 25; ++i) {
      db.exec({
        sql: 'INSERT INTO t(a,b) VALUES (?,?)',
        bind: [i, i * 2],
      });
    }
    log('Query data with exec()...');
    db.exec({
      sql: 'SELECT a FROM t ORDER BY a LIMIT 3',
      callback: (row) => {
        log(row);
      },
    });
  } finally {
    db.close();
  }
};

log('Loading and initializing SQLite3 module...');
sqlite3InitModule({
  print: log,
  printErr: error,
}).then((sqlite3) => {
  try {
    log('Done initializing. Running demo...');
    start(sqlite3);
  } catch (err) {
    error(err.name, err.message);
  }
});

const worker = new Worker('/worker.js', { type: 'module' });
worker.onmessage = (e) => {  
  e.data.type === 'log' ? workerLog(e.data.payload) : workerError(e.data.payload);  
};
