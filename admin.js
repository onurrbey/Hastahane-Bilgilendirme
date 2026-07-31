import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contentRef = doc(db, "screen", "current");

const hospitalName = document.getElementById("hospitalName");
const screenSubtitle = document.getElementById("screenSubtitle");
const doctors = document.getElementById("doctors");
const pharmacies = document.getElementById("pharmacies");
const saveButton = document.getElementById("saveButton");
const status = document.getElementById("status");

function linesToArray(value) {
  return value
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);
}

function setStatus(message, type = "") {
  status.textContent = message;
  status.className = `status ${type}`.trim();
}

async function loadCurrentData() {
  try {
    const snapshot = await getDoc(contentRef);
    if (!snapshot.exists()) return;

    const data = snapshot.data();
    hospitalName.value = data.hospitalName || "";
    screenSubtitle.value = data.screenSubtitle || "";
    doctors.value = Array.isArray(data.doctors) ? data.doctors.join("\n") : "";
    pharmacies.value = Array.isArray(data.pharmacies) ? data.pharmacies.join("\n") : "";
  } catch (error) {
    console.error(error);
    setStatus("Mevcut bilgiler yüklenemedi.", "error");
  }
}

saveButton.addEventListener("click", async () => {
  saveButton.disabled = true;
  setStatus("Kaydediliyor...");

  try {
    await setDoc(contentRef, {
      hospitalName: hospitalName.value.trim() || "HASTANE BİLGİLENDİRME EKRANI",
      screenSubtitle: screenSubtitle.value.trim() || "Güncel nöbet bilgileri",
      doctors: linesToArray(doctors.value),
      pharmacies: linesToArray(pharmacies.value),
      updatedAt: serverTimestamp()
    }, { merge: true });

    setStatus("Bilgiler başarıyla kaydedildi.", "ok");
  } catch (error) {
    console.error(error);
    setStatus("Kayıt sırasında hata oluştu. Firestore kurallarını kontrol edin.", "error");
  } finally {
    saveButton.disabled = false;
  }
});

loadCurrentData();
