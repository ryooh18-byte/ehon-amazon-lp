const copyButtons = document.querySelectorAll(".copy-button");

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

async function copyPrompt(button) {
  const targetId = button.dataset.copyTarget;
  const target = document.getElementById(targetId);
  const label = button.querySelector(".copy-label");

  if (!target || !label) {
    return;
  }

  const promptText = target.textContent.trim();
  const defaultLabel = "プロンプトをコピー";

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(promptText);
    } else {
      fallbackCopy(promptText);
    }

    button.classList.remove("is-error");
    button.classList.add("is-copied");
    label.textContent = "コピーしました ✅";
  } catch (error) {
    button.classList.remove("is-copied");
    button.classList.add("is-error");
    label.textContent = "コピーできませんでした";
  }

  window.setTimeout(() => {
    button.classList.remove("is-copied", "is-error");
    label.textContent = defaultLabel;
  }, 2200);
}

copyButtons.forEach((button) => {
  button.addEventListener("click", () => copyPrompt(button));
});
