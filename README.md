# dicoding\_\_BFABE-OpenMusic-API

Dicoding academy | Belajar Fundamental Aplikasi Back-End | Submission | OpenMusic API

## Kriteria OpenMusic API versi 3

Terdapat 4 kriteria utama yang harus Anda penuhi dalam membuat proyek OpenMusic API.

### Kriteria 1 : Terdapat fitur ekspor lagu pada playlist

API yang Anda buat harus tersedia fitur ekspor lagu pada playlist melalui route:

Method : POST
URL : /exports/playlists/{playlistId}
Body Request:

```json
{
    "targetEmail": string
}
```

Ketentuan:

- Payload targetEmail wajib bernilai email yang valid (bukan sembarang nilai string)
- Pengguna hanya bisa mengekspor playlist yang menjadi haknya sebagai pemilik atau kolaborator playlist
- Wajib menggunakan message broker dengan menggunakan RabbitMQ.
- Nilai host server RabbitMQ wajib menggunakan environment variable RABBITMQ_SERVER
- Wajib mengirimkan program consumer.
- Hasil ekspor berupa data json.
- Dikirimkan melalui email menggunakan nodemailer.
- Kredensial alamat dan password email pengirim wajib menggunakan environment variable MAIL_ADDRESS dan MAIL_PASSWORD.

Response yang harus dikembalikan:

Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "Permintaan Anda sedang kami proses"
}
```

### Kriteria 2 : Terdapat fitur mengunggah gambar

API yang Anda buat harus terdapat fitur mengunggah gambar melalui route:

Method : POST
URL : /upload/pictures
Body Request (Form data):

```json
{
"data": file
}
```

Ketentuan:

- Tipe konten yang diunggah harus merupakan MIME types dari images.
- Ukuran file gambar maksimal 500KB.
- Anda bisa menggunakan File System (lokal) atau S3 Bucket dalam menampung object.
- Bila menggunakan S3 Bucket, nama bucket wajib menggunakan variable environment AWS_BUCKET_NAME.

Response yang harus dikembalikan:

Status Code: 201
Response Body:

```json
{
  "status": "success",
  "message": "Gambar berhasil diunggah",
  "data": {
    "pictureUrl": "http://…"
  }
}
```

### Kriteria 3 : Menerapkan Server-Side Cache

Menerapkan server-side cache pada resource GET playlists/{playlistId}/songs (Mendapatkan daftar lagu pada playlist).

Cache harus selalu dihapus ketika ada lagu yang dimasukkan atau dihapus dari playlist tersebut.

Memory caching engine wajib menggunakan Redis atau Memurai (Windows).
Nilai host server Redis wajib menggunakan environment variable REDIS_SERVER.

### Kriteria 4 : Pertahankan Fitur OpenMusic API versi 2 dan 1

Pastikan fitur dan kriteria OpenMusic API versi 2 dan 1 tetap dipertahankan seperti:

-Menyimpan lagu
-Menampilkan seluruh lagu
-Menampilkan detail lagu
-Mengubah data lagu
-Menghapus data lagu
-Fitur registrasi pengguna
-Fitur login pengguna
-Fitur refresh access token
-Fitur logout pengguna
-Menambahkan playlist
-Melihat daftar playlist yang dimiliki
-Menghapus playlist
-Menambahkan lagu ke playlist
-Melihat daftar lagu pada playlist
-Menghapus lagu dari playlist
