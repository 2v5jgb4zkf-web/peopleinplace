/**
 * peopleinplace.ca contact card
 *
 * Messages are emailed via FormSubmit (free).
 * Change DELIVERY_EMAIL if you want notes somewhere else.
 * First time: check that inbox and click FormSubmit’s confirm link.
 */
const DELIVERY_EMAIL = "shelbyeleslie@gmail.com";

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

    if (!DELIVERY_EMAIL) {
      setStatus(
        "Message delivery is not configured yet. Please try again later.",
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
    data.append("_subject", "peopleinplace.ca — contact card");
    data.append("_template", "table");
    data.append("_captcha", "false");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/" + encodeURIComponent(DELIVERY_EMAIL),
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        }
      );

      const body = await res.json().catch(function () {
        return {};
      });

      if (res.ok) {
        form.reset();
        setStatus(
          "Thank you. Your message has been sent. (If this is the first note ever, I may need to confirm the inbox once.)",
          "ok"
        );
      } else {
        setStatus(
          body.message ||
            body.error ||
            "The message could not be sent. Please try again shortly.",
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
