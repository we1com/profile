/* ===== ВПИШИ СВОИ ДАННЫЕ ЗДЕСЬ (больше нигде менять ссылки не нужно) ===== */
const NAME = "welcom"; // имя в логотипе, заголовке и подвале

const LINKS = {
  // соцсети
  telegram: "https://t.me/we1nx_444",
  instagram: "https://www.instagram.com/satybaldy.nur/",
  github: "https://github.com/we1com",
  // ссылки на твои проекты (по клику на фото откроется этот сайт)
  xarizma: "https://xarizen-hgor12345.vercel.app/",
  runsmart: "https://qwertyy-ycs1.vercel.app/",
  restaurant: "https://ret-iota.vercel.app/",
  roboschool: "https://prac2-tpsq.vercel.app/",
  wpintensive: "#",   // сюда вставь ссылку на WordPress-интенсив, когда она будет
  valmari: "https://valmarsf.vercel.app/"
};
/* ======================================================================== */

const root = document.documentElement;
const store = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
};

// имя и год
document.querySelectorAll("[data-name]").forEach(el => (el.textContent = NAME));
document.getElementById("year").textContent = new Date().getFullYear();

// ссылки: пока стоит "#", клик ничего не делает
document.querySelectorAll("[data-link]").forEach(el => {
  const url = LINKS[el.dataset.link] || "#";
  el.href = url;
  if (url === "#") {
    el.addEventListener("click", e => e.preventDefault());
  } else {
    el.target = "_blank";
    el.rel = "noopener";
  }
});

// смена языка (RU / KK / EN)
function setLang(lang) {
  if (!I18N[lang]) lang = "ru";
  const dict = I18N[lang];
  root.lang = lang;
  document.title = dict.doc.replace("{name}", NAME);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = dict[el.dataset.i18n].replace("{name}", NAME);
  });
  document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
  store.set("lang", lang);
}
document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
setLang(store.get("lang") || "ru");

// смена темы (тёмная / светлая)
document.querySelector(".theme").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  store.set("theme", next);
});

// мобильное меню
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  burger.setAttribute("aria-expanded", nav.classList.toggle("open"));
});
nav.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }
});

// кнопка «наверх»
const up = document.querySelector(".up");
window.addEventListener("scroll", () => up.classList.toggle("on", window.scrollY > 600), { passive: true });
up.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
