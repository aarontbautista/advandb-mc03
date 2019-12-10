@ECHO off

:central-crud
  start cmd /k "cd central-crud && node server.js"

:palawan-crud
  start cmd /k "cd palawan-crud && node server.js"

:marinduque-crud
  start cmd /k "cd marinduque-crud && node server.js"

:client
  start cmd /k "cd client && node server.js"