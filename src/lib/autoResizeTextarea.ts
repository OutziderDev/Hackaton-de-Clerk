export function autoResizeTextarea(): void {
  const textareas = document.querySelectorAll<HTMLTextAreaElement>('textarea');

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });

    // Ajuste inicial
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
}