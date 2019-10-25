@echo off
title ...Running HRIS sindata...

REM Running Application
start /min "" git pull ^& exit
start /min "" application.bat ^& exit

echo ...Aplikasi berhasil dijalankan...
pause