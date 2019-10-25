@echo off
title ...Running HRIS sindata...

REM Running Application
start /min "" git pull ^& exit
start /min "" npm start ^& exit
start /min "" application.bat ^& exit

echo ...Aplikasi berhasil dijalankan...
pause