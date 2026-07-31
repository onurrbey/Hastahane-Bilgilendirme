HASTANE BİLGİLENDİRME EKRANI - HIZLI KURULUM

Dosyalar:
- index.html       : TV'de tam ekran açılacak sayfa
- admin.html       : Bilgileri değiştireceğiniz yönetim sayfası
- style.css        : Tasarım
- display.js       : TV ekranı Firebase bağlantısı
- admin.js         : Yönetim paneli Firebase bağlantısı
- firebase-config.js : Firebase proje bilgileri
- firestore-rules.txt: Geçici Firestore kuralı

GITHUB'A YÜKLEME
1. GitHub ana sayfasında "Create repository" seçin.
2. Repository adı: nobetci-bilgilendirme-ekrani
3. Public seçin ve repository oluşturun.
4. "uploading an existing file" seçeneğine tıklayın.
5. Bu klasördeki 7 dosyayı yükleyin ve Commit changes deyin.
6. Repository > Settings > Pages bölümüne girin.
7. Source: Deploy from a branch
8. Branch: main / root seçin ve Save deyin.
9. Birkaç dakika sonra adresiniz oluşur:
   https://KULLANICI-ADINIZ.github.io/nobetci-bilgilendirme-ekrani/

YÖNETİM PANELİ
Adresin sonuna admin.html ekleyin:
https://KULLANICI-ADINIZ.github.io/nobetci-bilgilendirme-ekrani/admin.html

FIRESTORE KURALI
Firebase > Firestore Database > Rules bölümüne girin.
firestore-rules.txt içindeki kuralları yapıştırıp Publish deyin.

ÖNEMLİ GÜVENLİK NOTU
Bu ilk deneme sürümünde yazma erişimi açıktır. Adresinizi bilen biri bilgileri değiştirebilir.
Sistem çalıştıktan sonra Firebase Authentication ile yönetim panelini şifreli hale getirin.
TV ekranında kişisel sağlık verisi veya hasta bilgisi göstermeyin.

TV'DE TAM EKRAN
TV bilgisayarında index.html adresini Chrome'da açın ve F11'e basın.
