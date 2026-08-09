/**
 * peopleinplace.ca contact card
 *
 * 1. Create a free form at https://formspree.io (or similar)
 * 2. Paste your form id below, e.g. "xyzabcde"
 * 3. Redeploy / re-upload the site
 *
 * Submissions land in your email. Nothing is public.
 */
const FORMSPREE_ID = ""; // e.g. "moqzwxyz"

(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const button = document.getElementById("submit-btn");

  function setStatus(msg, kind) {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Honeypot
    if (form.website && form.website.value) {
      setStatus("Thank you. Your message has been sent.", "ok");
      form.reset();
      return;
    }

    if (!FORMSPREE_ID) {
      setStatus(
        "Message delivery is not yet configured. Please finish Formspree setup in form.js, or write by email in the meantime.",
        "err"
      );
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.disabled = true;
    setStatus("Sending…");

    const data = new FormData(form);
    data.delete("website");
    data.append("_subject", "peopleinplace.ca correspondence");

    try {
      const res = await fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setStatus("Thank you. Your message has been sent.", "ok");
      } else {
        const body = await res.json().catch(function () {
          return {};
        });
        setStatus(
          body.error || "The message could not be sent. Please try again shortly.",
          "err"
        );
      }
    } catch (err) {
      setStatus("A network error occurred. Please try again.", "err");
    } finally {
      button.disabled = false;
    }
  });
})();
