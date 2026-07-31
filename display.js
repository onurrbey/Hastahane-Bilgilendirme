import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const contentRef = doc(db, "screen", "current");

const doctorList = document.getElementById("doctorList");
const pharmacyList = document.getElementById("pharmacyList");
const hospitalName = document.getElementById("hospitalName");
const screenSubtitle = document.getElementById("screenSubtitle");

function renderList(element, items, emptyText) {
  element.innerHTML = "";
  const cleanItems = Array.isArray(items)
    ? items.map(v => String(v).trim()).filter(Boolean)
    : [];

  if (cleanItems.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = emptyText;
    element.appendChild(li);
    return;
  }

  for (const item of cleanItems) {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  }
}

onSnapshot(contentRef, snapshot => {
  if (!snapshot.exists()) {
    renderList(doctorList, [], "Henüz hekim bilgisi girilmedi.");
    renderList(pharmacyList, [], "Henüz eczane bilgisi girilmedi.");
    return;
  }

  const data = snapshot.data();
  hospitalName.textContent = data.hospitalName || "HASTANE BİLGİLENDİRME EKRANI";
  screenSubtitle.textContent = data.screenSubtitle || "Güncel nöbet bilgileri";
  renderList(doctorList, data.doctors, "Henüz hekim bilgisi girilmedi.");
  renderList(pharmacyList, data.pharmacies, "Henüz eczane bilgisi girilmedi.");
}, error => {
  console.error(error);
  renderList(doctorList, [], "Veriler yüklenemedi.");
  renderList(pharmacyList, [], "Veriler yüklenemedi.");
});

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  document.getElementById("date").textContent = now.toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

updateClock();
setInterval(updateClock, 1000);
