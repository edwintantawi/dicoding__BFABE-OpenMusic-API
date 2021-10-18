# dicoding\_\_BFABE-OpenMusic-API

Dicoding academy | Belajar Fundamental Aplikasi Back-End | Submission | OpenMusic API

## Kriteria OpenMusic API versi 2

Terdapat 13 kriteria utama yang harus Anda penuhi dalam membuat proyek OpenMusic API.

### Kriteria 1 : Terdapat fitur registrasi pengguna (Menambahkan user)

API yang Anda buat harus dapat menambahkan user melalui route:

Method : POST
URL : /users
Body Request:

```json
{
  "username": string,
  "password": string,
  "fullname": string
}
```

Objek user yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:

```json
{
  "id": "user-Qbax5Oy7L8WKf74l",
  "username": "dicoding",
  "password": "encryptedpassword",
  "fullname": "Dicoding Indonesia"
}
```

Ketentuan:

Username harus unik.
Response yang harus dikembalikan:
Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "User berhasil ditambahkan",
  "data": {
    "userId": "user-Qbax5Oy7L8WKf74l"
  }
}
```

### Kriteria 2 : Terdapat fitur login pengguna (menambahkan authentication)

API yang Anda buat harus tersedia fitur login user melalui route:

Method : POST
URL : /authentications
Body Request:

```json
{
  "username": string,
  "password": string
}
```

Ketentuan:

Authentication menggunakan JWT token.
JWT token harus mengandung payload berisi userId yang merupakan id dari user autentik.
Nilai secret key token JWT baik access token ataupun refresh token wajib menggunakan environment variable ACCESS_TOKEN_KEY dan REFRESH_TOKEN_KEY.

Response yang harus dikembalikan:

Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "Authentication berhasil ditambahkan",
  "data": {
    "accessToken": "jwt.access.token",
    "refreshToken": "jwt.refresh.token"
  }
}
```

### Kriteria 3 : Terdapat fitur refresh access token (memperbarui authentication)

API yang Anda buat harus tersedia fitur Refresh Access Token user melalui route:

Method : PUT
URL : /authentications
Body Request:

```json
{
  "refreshToken": "jwt.refresh.token"
}
```

Ketentuan:

Refresh token memiliki signature yang benar serta terdaftar di database.
Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
{
  "status": "success",
  "message": "Authentication berhasil diperbarui",
  "data": {
    "accessToken": "jwt.access.token"
  }
}
```

### Kriteria 4 : Terdapat fitur logout pengguna (menghapus authentication)

API yang Anda buat harus tersedia fitur logout user melalui route:

Method : DELETE
URL : /authentications
Body Request:

```json
{
  "refreshToken": "jwt.refresh.token"
}
```

Ketentuan:

Refresh token terdaftar di database.

Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
{
  "status": "success",
  "message": "Refresh token berhasil dihapus"
}
```

### Kriteria 5 : Terdapat fitur menambahkan playlist

API yang Anda buat harus tersedia fitur menambahkan playlist melalui route:

Method : POST
URL : /playlists
Body Request:

```json
{
"name": string
}
```

Objek user yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini:

```json
{
  "id": "playlist-Qbax5Oy7L8WKf74l",
  "name": "Lagu Indie Hits Indonesia",
  "owner": "user-Qbax5Oy7L8WKf74l"
}
```

Ketentuan:

Playlist merupakan resource yang dibatasi (restrict). Untuk mengaksesnya membutuhkan access token.
Properti owner merupakan user id dari pembuat playlist. Anda bisa mendapatkan nilainya melalui artifacts payload JWT.

Response yang harus dikembalikan:

Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "Playlist berhasil ditambahkan",
  "data": {
    "playlistId": "playlist-Qbax5Oy7L8WKf74l"
  }
}
```

### Kriteria 6 : Terdapat fitur melihat daftar playlist yang dimiliki

API yang Anda buat harus tersedia fitur melihat daftar playlist yang dimiliki pengguna melalui route:

Method : GET
URL : /playlists
Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
{
  "status": "success",
  "data": {
    "playlists": [
      {
        "id": "playlist-Qbax5Oy7L8WKf74l",
        "name": "Lagu Indie Hits Indonesia",
        "username": "dicoding"
      },
      {
        "id": "playlist-lmA4PkM3LseKlkmn",
        "name": "Lagu Untuk Membaca",
        "username": "dicoding"
      }
    ]
  }
}
```

Ketentuan:

Playlist yang muncul hanya yang ia miliki saja.

### Kriteria 7 : Terdapat fitur menghapus playlist

API yang Anda buat harus tersedia fitur menghapus playlist melalui route:

Method : DELETE
URL : /playlists/{playlistId}

Ketentuan:

Hanya owner playlist yang dapat menghapus playlist.

Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
{
  "status": "success",
  "message": "Playlist berhasil dihapus"
}
```

### Kriteria 8 : Terdapat fitur menambahkan lagu ke playlist

API yang Anda buat harus tersedia fitur menambahkan lagu ke playlist melalui route:

Method : POST
URL : /playlists/{playlistId}/songs
Body Request:

```json
{
"songId": string
}
```

Ketentuan:

Hanya owner playlist (atau kolabolator) yang dapat menambahkan lagu ke playlist.
songId wajib bernilai id lagu yang valid.

Response yang harus dikembalikan:

Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "Lagu berhasil ditambahkan ke playlist"
}
```

### Kriteria 9 : Terdapat fitur melihat daftar lagu pada playlist

API yang Anda buat harus tersedia fitur melihat daftar lagu pada playlist melalui route:

Method : GET
URL : /playlists/{playlistId}/songs
Ketentuan:

Hanya owner (dan kolabolator) playlist yang dapat melihat daftar lagu pada playlist.

Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
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
      }
    ]
  }
}
```

### Kriteria 10 : Terdapat fitur menghapus lagu dari playlist

API yang Anda buat harus tersedia fitur menghapus lagu dari playlist melalui route:

Method : DELETE
URL : /playlists/{playlistId}/songs
Body Request:

```json
{
"songId": string
}
```

Ketentuan:

Hanya owner playlist (atau kolabolator) yang dapat menghapus lagu dari playlist.
songId wajib bernilai id lagu yang valid.

Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
{
  "status": "success",
  "message": "Lagu berhasil dihapus dari playlist"
}
```

### Kriteria 11 : Menerapkan Data Validation

Wajib menerapkan proses Data Validation pada Request Payload sesuai spesifikasi berikut:

1. **POST /users:**

- username : string, required.
- password : string, required.
- fullname : string, required.

2. **POST /authentications:**

- username : string, required.
- password : string, required.

3. **PUT /authentications:**

- refreshToken : string, required.

4. **DELETE /authentications:**

- refreshToken : string, required.

5. **POST /playlists:**

- name : string, required.

6. **POST /playlists/{playlistId}/songs**

- songId : string, required.

### Kriteria 12 : Penanganan Eror (Error Handling)

**Ketika proses validasi data pada request payload tidak sesuai (gagal), server harus mengembalikan response:**
status code: 400 (Bad Request)
response body:
status: fail
message: `<apa pun selama tidak kosong>`

**Ketika pengguna mengakses resource yang tidak ditemukan, server harus mengembalikan response:**
status code: 404 (Not Found)
response body:
status: fail
message: `<apa pun selama tidak kosong>`

**Ketika pengguna mengakses resource yang dibatasi tanpa access token, server harus mengembalikan response:**
status code: 401 (Unauthorized)
response body:
status: fail
message: `<apa pun selama tidak kosong>`

**Ketika pengguna memperbarui access token menggunakan refresh token yang tidak valid, server harus mengembalikan response:**
status code: 400 (Bad Request)
response body:
status: fail
message: `<apa pun selama tidak kosong>`

**Ketika pengguna mengakses resource yang bukan haknya, server harus mengembalikan response:**
status code: 403 (Forbidden)
response body:
status: fail
message: `<apa pun selama tidak kosong>`

**Ketika terjadi server eror, server harus mengembalikan response:**
status code: 500 (Internal Server Error)
Response body:
status: error
message: `<apa pun selama tidak kosong>`

### Kriteria 13 : Pertahankan Fitur OpenMusic API versi 1

Pastikan fitur dan kriteria OpenMusic API versi 1 tetap dipertahankan seperti:

- API dapat menyimpan lagu
- API dapat menampilkan seluruh lagu
- API dapat menampilkan detail lagu
- API dapat mengubah data lagu
- API dapat menghapus data lagu
- Menerapkan Data validations pada POST /songs dan PUT /songs

## Kriteria Opsional OpenMusic API versi 2

Selain kriteria utama, terdapat kriteria opsional yang yang dapat Anda penuhi agar mendapat nilai yang baik.

- Memiliki fitur menambahkan kolaborator pada playlist
- Terdapat fitur menambahkan kolaborator pada playlist melalui route:

Method: POST
URL: /collaborations
Body Request:

```json
{
"playlistId": string,
"userId": string,
}
```

Objek collaboration yang disimpan pada server memiliki struktur seperti contoh di bawah ini:

```json
{
  "id": "collab-Qbax5Oy7L8WKf74l",
  "playlistId": "playlist-Qbax5Oy7L8WKf74l",
  "userId": "user-Qbax5Oy7L8WKf74l"
}
```

Ketentuan:

Hanya pemilik playlist yang dapat menambahkan kolaborator.

Response yang harus dikembalikan:

Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "Kolaborasi berhasil ditambahkan",
  "data": {
    "collaborationId": "collab-Qbax5Oy7L8WKf74l"
  }
}
```

Memiliki fitur menghapus kolaborator dari playlist
Terdapat fitur menghapus kolaborator pada playlist melalui route:

Method: DELETE
URL: /collaborations
Body Request:

```json
{
"playlistId": string,
"userId": string,
}
```

Ketentuan:

Hanya pemilik playlist yang dapat menghapus kolaborator.

Response yang harus dikembalikan:

Status Code: 200
Response Body:

```json
{
  "status": "success",
  "message": "Kolaborasi berhasil dihapus"
}
```

### Hak akses kolaborator

Ketika user ditambahkan sebagai kolaborator playlist oleh pemilik playlist. Maka hak akses user tersebut terhadap playlist adalah:

- Playlist tampil pada permintaan GET /playlists.
- Dapat menambahkan lagu ke dalam playlist.
- Dapat menghapus lagu dari playlist.
- Dapat melihat daftar lagu yang ada di playlist.

Referensi Entity Relationship Diagram (ERD) untuk OpenMusic API versi 2

![ERD openMusic v2](https://d17ivq9b7rppb3.cloudfront.net/original/academy/202105241122027a63ac53ae1fc8ffb27562e4a0c73970.jpeg)
