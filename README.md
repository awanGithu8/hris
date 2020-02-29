# Permit Application Documentation

Client & Server & API Documentation

# Github Source Code

    https://github.com/onesinus/hris

# Link Demo
    Back-End Base URL: https://hris-backend.herokuapp.com/api/
    Front-End: http://sindata.herokuapp.com


# Client & Server Documentation

## Client

    Tools: React JS + Ant Design

### Dependencies 
|   Package Name                |   Version     |
| ---------------               | ------------  |
|  antd                         | ^3.26.6       |
|  axios                        | ^0.19.0       |
|  chart.js                     | ^2.9.3        |
|  emailjs-com                  | ^2.4.1        |
|  react                        | ^16.12.0      |
|  react-chartjs-2              | ^2.9.0        |
|  react-dom                    | ^16.12.0      |
|  react-router-dom             | ^5.1.2        |
|  react-scripts                | ^3.3.0        |

### Default Port

    3000

### Running Client

    npm start (jalankan di root folder & pastikan sudah menjalankan npm install untuk pertama kali)


## Server

    Tools: Express + Mongoose

### Dependencies 
|   Package Name    |   Version     |
| ---------------   | ------------  |
|  cors             | ^2.8.5        |
|  body-parser      | ^1.19.0       |
|  express          | 4.17.1        |
|  mongoose         | ^5.7.1        |




### Default Port

    3001


### Running Server

    npm start (jalankan difolder backend & pastikan sudah menjalankan npm install untuk pertama kali)


# API Documentation

## Base Url: http://localhost:3001/api

## Users

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /checkUserLogin       | POST      | Verifikasi untuk melakukan cek terhadap user yang ingin login
| /userLoggedIn         | POST      | Menandakan user telah berhasil login
| /userLoggedOut        | POST      | Menandakan user telah berhasil logout
| /getData              | GET       | Mendapatkan semua list user yang ada didatabase
| /putData              | POST      | Menambahkan user ke database
| /updateData           | POST      | Mengubah data user
| /deleteData           | DELETE    | Menghapus data user dari database

## Divisions

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /listDivision         | GET       | Mendapatkan semua list divisi yang ada didatabase
| /addDivision          | POST      | Menambahkan divisi ke database
| /updateDivision       | POST      | Mengubah data divisi
| /deleteDivision       | DELETE    | Menghapus data divisi dari database
| /listApprover         | GET       | Mendapatkan data user yang role-nya sebagai approver


## Job Title

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /listJobTitle         | GET       | Mendapatkan semua list job title yang ada didatabase
| /addJobTitle          | POST      | Menambahkan job title ke database
| /updateJobTitle       | POST      | Mengubah data job title
| /deleteJobTitle       | DELETE    | Menghapus data job title dari database

## Special Permit

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /listSpecialPermit    | GET       | Mendapatkan semua list job cuti khusus yang ada didatabase
| /addSpecialPermit     | POST      | Menambahkan job cuti khusus ke database
| /updateSpecialPermit  | POST      | Mengubah data job cuti khusus
| /deleteSpecialPermit  | DELETE    | Menghapus data job cuti khusus dari database

## Request Cuti, Approval

| Url                   | Method    |   Description |
| -----------------     | --------- | ------------- |
| /listCuti             | GET       | Mendapatkan semua list cuti  yang ada didatabase
| /listCutiUser         | POST      | Mendapatkan list cuti yang dimiliki masing-masing user
| /listApproval         | POST      | Mendapatkan list cuti yang harus diapprove oleh setiap approver
| /listApprovalAll      | POST      | Mendapatkan semua list cuti yang belum diapprove
| /addCuti              | POST      | Menambahkan data cuti ke database
| /approveCuti          | POST      | Menyetujui cuti
| /rejectCuti           | POST      | Menolak cuti
| /deleteCuti           | GET       | Menghapus cuti