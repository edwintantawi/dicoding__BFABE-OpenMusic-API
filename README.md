# dicoding__BFABE-OpenMusic-API
Dicoding academy | Belajar Fundamental Aplikasi Back-End | Submission | OpenMusic API

## Kriteria OpenMusic API versi 1
Terdapat 7 kriteria utama yang harus Anda penuhi dalam membuat proyek OpenMusic API versi 1.

### Kriteria 1 : API dapat menyimpan lagu
API yang Anda buat harus dapat menyimpan lagu melalui route:

Method : POST\
URL : /songs\
Body Request:

```javascript
{
    "title": string,
    "year": number,
    "performer": string,
    "genre": string,
    "duration": number
}
```

Objek lagu yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:

```javascript
{
    "id": "song-Qbax5Oy7L8WKf74l",
    "title": "Kenangan Mantan",
    "year": 2021,
    "performer": "Dicoding",
    "genre": "Indie",
    "duration": 120,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```

Properti yang ditebalkan diolah dan didapatkan di sisi server. Berikut penjelasannya:

**id** : nilai id haruslah unik. Untuk membuat nilai unik, Anda bisa memanfaatkan nanoid.\
**insertedAt** : merupakan properti yang menampung tanggal dimasukkannya lagu. Anda bisa gunakan new Date().toISOString() untuk menghasilkan nilainya.\
**updatedAt** : merupakan properti yang menampung tanggal diperbarui lagu. Ketika lagu baru dimasukkan, berikan nilai properti ini sama dengan insertedAt.


Response yang harus dikembalikan:

Status Code: 201\
Response Body:

```javascript
{
    "status": "success",
    "message": "Lagu berhasil ditambahkan",
    "data": {
        "songId": "song-Qbax5Oy7L8WKf74l"
    }
}
```


### Kriteria 2 : API dapat menampilkan seluruh lagu
APi yang Anda buat harus dapat menampilkan seluruh lagu yang disimpan melalui route:

Method: GET\
URL: /songs

Response yang harus dikembalikan:

Status Code: 200\
Response Body:

```javascript
{
    "status": "success",
    "data": {
        "songs": [
            {
                "id": "song-Qbax5Oy7L8WKf74l",
                "title": "Kenangan Mantan",
                "performer": "Dicoding"
            },
            {
                "id": "song-poax5Oy7L8WKllqw",
                "title": "Kau Terindah",
                "performer": "Dicoding"
            },
            {
                "id": "song-Qalokam7L8WKf74l",
                "title": "Tulus Padamu",
                "performer": "Dicoding"
            }
        ]
    }
}
```

Jika belum terdapat lagu yang dimasukkan, server bisa merespons dengan array songs kosong.

```javascript
{
    "status": "success",
    "data": {
        "songs": []
    }
}
```


### Kriteria 3 : API dapat menampilkan detail lagu
API yang Anda buat harus dapat menampilkan seluruh lagu yang disimpan melalui route:

Method: GET\
URL: /songs/{songId}

Response yang harus dikembalikan:

Status Code: 200\
Response Body:

```javascript
{
    "status": "success",
    "data": {
        "song": {
            "id": "song-Qbax5Oy7L8WKf74l",
            "title": "Kenangan Mantan",
            "year": 2021,
            "performer": "Dicoding",
            "genre": "Indie",
            "duration": 120,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```


### Kriteria 4 : API dapat mengubah data lagu
API yang Anda buat harus dapat mengubah data lagu berdasarkan id melalui route:

Method: PUT\
URL: /songs/{songId}\
Body Request:

```javascript
{
    "title": string,
    "year": number,
    "performer": string,
    "genre": string,
    "duration": number
}
```

Response yang dikembalikan:

Status code: 200\
Response Body:

```javascript
{
    "status": "success",
    "message": "lagu berhasil diperbarui"
}
```


### Kriteria 5 : API dapat menghapus data lagu
API yang Anda buat harus dapat mengubah data lagu berdasarkan id melalui route:

Method : DELETE\
URL : /songs/{songId}

Bila lagu berhasil diperbarui, server harus mengembalikan respons dengan:

Status Code : 200\
Response Body:

```javascript
{
    "status": "success",
    "message": "lagu berhasil dihapus"
}

```

### Kriteria 6 : Menerapkan Data Validation
Wajib menerapkan proses Data Validation pada Request Payload sesuai spesifikasi berikut:

**POST /songs.**\
title : string, required.\
year : number, required.\
performer : string, required.\
genre : string.\
duration: number.

**PUT /songs.**\
title : string, required.\
year : number, required.\
performer : string, required.\
genre : string.\
duration: number.

### Kriteria 7 : Penanganan Eror (Error Handling)
Ketika proses validasi data pada request payload tidak sesuai (gagal), server harus mengembalikan response:
```
status code: 400 (Bad Request)
response body:
status: fail
message: <apa pun selama tidak kosong>
```

Ketika pengguna mengakses resource yang tidak ditemukan, server harus mengembalikan response:
```
status code: 404 (Not Found)
response body:
status: fail
message: <apa pun selama tidak kosong>
```

Ketika terjadi server eror, server harus mengembalikan response:
```
status code: 500 (Internal Server Error)
Response body:
status: error
Message: <apa pun selama tidak kosong>
```



### Kriteria 8 : Menggunakan Database dalam Menyimpan Data lagu
Data lagu harus disimpan di dalam database menggunakan PostgreSQL agar ketika di-restart data tidak akan hilang.\
Wajib menggunakan teknik migrations dalam mengelola struktur tabel pada database.\
Wajib menyimpan nilai host, post, maupun kredensial dalam mengakses database pada environment variable dengan ketentuan:
```
PGUSER : menyimpan nilai user untuk mengakses database.
PGPASSWORD : menyimpan nilai password dari user database.
PGDATABASE : menyimpan nilai nama database yang digunakan.
PGHOST : menyimpan nilai host yang digunakan oleh database.
PGPORT :  menyimpan nilai port yang digunakan oleh database.
```
Wajib menggunakan package dotenv serta berkas .env dalam mengelola environment variable.
