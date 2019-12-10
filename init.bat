@ECHO off

:central-crud
  start cmd /c "cd central-crud && npm i & exit"

:palawan-crud
  start cmd /c "cd palawan-crud && npm i & exit"

:marinduque-crud
  start cmd /c "cd marinduque-crud && npm i & exit"

:client
  start cmd /c "cd client && npm i & exit"