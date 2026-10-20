/* ============================================
   AMASHOES — Signup popup
   Shows once per browser session (sessionStorage),
   only to logged-out visitors, a few seconds after
   the page loads. Dismissing it — or signing up —
   means it won't show again until the tab/browser
   is closed and reopened.
============================================ */
function openSignupPopup(){
  document.getElementById("signupPopupOverlay").classList.add("open");
  const popup = document.getElementById("signupPopup");
  popup.classList.add("open");
  popup.setAttribute("aria-hidden", "false");
}

function closeSignupPopup(){
  document.getElementById("signupPopupOverlay").classList.remove("open");
  const popup = document.getElementById("signupPopup");
  popup.classList.remove("open");
  popup.setAttribute("aria-hidden", "true");
  try{ sessionStorage.setItem("amashoes_signup_popup_dismissed", "1"); }catch{}
}

function setupSignupPopup(){
  document.getElementById("signupPopupOverlay").addEventListener("click", closeSignupPopup);
  document.getElementById("signupPopupClose").addEventListener("click", closeSignupPopup);
  document.getElementById("signupPopupLater").addEventListener("click", closeSignupPopup);

  document.getElementById("signupPopupBtn").addEventListener("click", () => {
    closeSignupPopup();
    navigateTo("login");
    const signupTab = document.querySelector('.auth-tab[data-tab="signup"]');
    if (signupTab) signupTab.click(); // land straight on the Sign up tab, not Log in
  });

  let alreadyDismissed = false;
  try{ alreadyDismissed = sessionStorage.getItem("amashoes_signup_popup_dismissed") === "1"; }catch{}
  if (alreadyDismissed) return;

  setTimeout(() => {
    if (currentUser) return; // already logged in — nothing to ask
    const loginPageActive = document.querySelector('.page[data-page="login"]')?.classList.contains("active");
    if (loginPageActive) return; // already looking at the signup form
    openSignupPopup();
  }, 3500);
}