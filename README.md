Notes App adalah aplikasi catatan yang memanfaatkan RESTful API sebagai sumber data utama. Proyek ini dirancang untuk memberikan pengalaman pengguna yang sederhana dan efisien dalam mengelola catatan.

## Fitur Utama

- **Mengelola Catatan**: 
  - Tambahkan catatan baru.
  - Dapatkan dan tampilkan daftar catatan yang diarsipkan.
  - Hapus catatan yang tidak diperlukan.

## Teknologi yang Digunakan

- **RESTful API**: Aplikasi ini menggunakan [Notes API](https://notes-api.dicoding.dev/v2) sebagai sumber data utama. Dokumentasi lengkap API dapat diakses melalui tautan tersebut.
  
- **Webpack**: 
  - Aplikasi dibangun menggunakan Webpack sebagai module bundler.
  - Jalankan aplikasi dalam mode pengembangan dengan perintah:
    ```bash
    npm run start-dev
    ```
  - Build aplikasi untuk produksi dengan perintah:
    ```bash
    npm run build
    ```

- **Fetch API**: 
  - Interaksi dengan API dilakukan menggunakan Fetch API untuk permintaan JavaScript yang asinkron.
  - Indikator loading dapat dibangun menggunakan Web Component untuk memberikan umpan balik kepada pengguna.


## Cara Menjalankan Aplikasi
1. Clone repositori ini.
2. Jalankan `npm install` untuk menginstal dependensi.
3. Untuk mode development, jalankan `npm run start-dev`.
4. Untuk build production, jalankan `npm run build`.
   

![HomePage](https://github.com/user-attachments/assets/d948f18e-7aab-43ae-b2eb-2e3447f6b277)
![Archive](https://github.com/user-attachments/assets/e227986b-ba88-4375-9540-01060451de86)
![pop-up-create](https://github.com/user-attachments/assets/b9dc1ffe-583f-4732-9079-08ffcba80bd0)
