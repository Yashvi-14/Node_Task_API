
const config ={
    "user": "yashvip",
    "password": "yashvip@2023",
    "server": "WINMSSQL\\SQLEXPRESS",
    "database": "testdb_2023",
    "options": {
      "encrypt": false
    },
    "pool": {
      "max": 50,
      "min": 0,
      "idleTimeoutMillis": 30000
    }
  };
 

  module.exports=config;