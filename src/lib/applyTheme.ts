import type { Theme } from "@/redux/slices/blueprint/blueprintType";

const injectGoogleFont = (family: string, id: string) => {
  if (typeof document === "undefined") return;
  const cleanFamily = family.split(",")[0].trim().replace(/['"]/g, "");
  const existingLink = document.getElementById(id);
  if (existingLink) {
    if (!existingLink.getAttribute("href")?.includes(cleanFamily)) {
      existingLink.setAttribute("href", `https://fonts.googleapis.com/css2?family=${cleanFamily.replace(/ /g, "+")}:wght@300;400;500;600;700;800&display=swap`);
    }
    return;
  }
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${cleanFamily.replace(/ /g, "+")}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
};

export const applyTheme = (theme: Theme | null, context: "public" | "admin" = "public") => {
  if (typeof document === "undefined" || !theme) return;
  const root = document.documentElement;
  
  if (theme.colors) {
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--primary-light", theme.colors.primaryLight);
    root.style.setProperty("--primary-dark", theme.colors.primaryDark);
    root.style.setProperty("--primary-hover", theme.colors.primaryHover);
    root.style.setProperty("--secondary", theme.colors.secondary);
    root.style.setProperty("--accent", theme.colors.accent);
    root.style.setProperty("--accent-hover", theme.colors.accentHover);
    root.style.setProperty("--accent-soft", theme.colors.accentSoft);
    root.style.setProperty("--background", theme.colors.background);
    root.style.setProperty("--surface", theme.colors.surface);
    root.style.setProperty("--card", theme.colors.card);
    root.style.setProperty("--text", theme.colors.text);
    root.style.setProperty("--text-secondary", theme.colors.textSecondary);
    root.style.setProperty("--text-muted", theme.colors.textMuted);
    root.style.setProperty("--border", theme.colors.border);
    root.style.setProperty("--border-hover", theme.colors.borderHover);
    root.style.setProperty("--success", theme.colors.success);
    root.style.setProperty("--warning", theme.colors.warning);
    root.style.setProperty("--error", theme.colors.error);
    root.style.setProperty("--info", theme.colors.info);
    root.style.setProperty("--overlay", theme.colors.overlay);
  }

  if (theme.typography) {
    if (theme.typography.bodyFont) { injectGoogleFont(theme.typography.bodyFont, "google-font-body"); root.style.setProperty("--font-body", theme.typography.bodyFont); }
    if (theme.typography.headingFont) { injectGoogleFont(theme.typography.headingFont, "google-font-heading"); root.style.setProperty("--font-heading", theme.typography.headingFont); }
    if (theme.typography.monoFont) { injectGoogleFont(theme.typography.monoFont, "google-font-mono"); root.style.setProperty("--font-mono", theme.typography.monoFont); }
    if (theme.typography.text) {
      root.style.setProperty("--text-xs", theme.typography.text.xs);
      root.style.setProperty("--text-sm", theme.typography.text.sm);
      root.style.setProperty("--text-base", theme.typography.text.base);
      root.style.setProperty("--text-md", theme.typography.text.md);
      root.style.setProperty("--text-lg", theme.typography.text.lg);
      root.style.setProperty("--text-xl", theme.typography.text.xl);
      root.style.setProperty("--text-2xl", theme.typography.text["2xl"]);
      root.style.setProperty("--text-3xl", theme.typography.text["3xl"]);
      root.style.setProperty("--text-4xl", theme.typography.text["4xl"]);
      root.style.setProperty("--text-5xl", theme.typography.text["5xl"]);
    }
    if (theme.typography.fw) {
      root.style.setProperty("--fw-light", theme.typography.fw.light);
      root.style.setProperty("--fw-normal", theme.typography.fw.normal);
      root.style.setProperty("--fw-medium", theme.typography.fw.medium);
      root.style.setProperty("--fw-semibold", theme.typography.fw.semibold);
      root.style.setProperty("--fw-bold", theme.typography.fw.bold);
      root.style.setProperty("--fw-extrabold", theme.typography.fw.extrabold);
    }
    if (theme.typography.lineHeight) {
      root.style.setProperty("--leading-tight", theme.typography.lineHeight.tight);
      root.style.setProperty("--leading-normal", theme.typography.lineHeight.normal);
      root.style.setProperty("--leading-relaxed", theme.typography.lineHeight.relaxed);
    }
  }

  if (theme.spacing) {
    root.style.setProperty("--space-1", theme.spacing["1"]);
    root.style.setProperty("--space-2", theme.spacing["2"]);
    root.style.setProperty("--space-3", theme.spacing["3"]);
    root.style.setProperty("--space-4", theme.spacing["4"]);
    root.style.setProperty("--space-5", theme.spacing["5"]);
    root.style.setProperty("--space-6", theme.spacing["6"]);
    root.style.setProperty("--space-8", theme.spacing["8"]);
    root.style.setProperty("--space-10", theme.spacing["10"]);
    root.style.setProperty("--space-12", theme.spacing["12"]);
    root.style.setProperty("--space-16", theme.spacing["16"]);
    root.style.setProperty("--space-20", theme.spacing["20"]);
    root.style.setProperty("--space-24", theme.spacing["24"]);
  }

  if (theme.radius) {
    root.style.setProperty("--radius-sm", theme.radius.sm);
    root.style.setProperty("--radius-md", theme.radius.md);
    root.style.setProperty("--radius-lg", theme.radius.lg);
    root.style.setProperty("--radius-xl", theme.radius.xl);
    root.style.setProperty("--radius-2xl", theme.radius["2xl"]);
    root.style.setProperty("--radius-full", theme.radius.full);
  }

  if (theme.shadow) {
    root.style.setProperty("--shadow-sm", theme.shadow.sm);
    root.style.setProperty("--shadow-md", theme.shadow.md);
    root.style.setProperty("--shadow-lg", theme.shadow.lg);
    root.style.setProperty("--shadow-hover", theme.shadow.hover);
  }

  if (theme.layout) {
    root.style.setProperty("--container", theme.layout.container);
    root.style.setProperty("--navbar-height", theme.layout.navbarHeight);
    root.style.setProperty("--section-padding", theme.layout.sectionPadding);
  }

  if (theme.buttons) {
    root.style.setProperty("--btn-height", theme.buttons.height);
    root.style.setProperty("--btn-padding-x", theme.buttons.paddingX);
    root.style.setProperty("--btn-radius", theme.buttons.radius);
    root.style.setProperty("--btn-primary-bg", theme.buttons.primaryBackground);
    root.style.setProperty("--btn-primary-text", theme.buttons.primaryText);
    root.style.setProperty("--btn-primary-hover", theme.buttons.primaryHover);
    root.style.setProperty("--btn-secondary-bg", theme.buttons.secondaryBackground);
    root.style.setProperty("--btn-secondary-text", theme.buttons.secondaryText);
    root.style.setProperty("--btn-secondary-hover", theme.buttons.secondaryHover);
    root.style.setProperty("--btn-outline-border", theme.buttons.outlineBorder);
    root.style.setProperty("--btn-outline-text", theme.buttons.outlineText);
    root.style.setProperty("--btn-outline-hover-bg", theme.buttons.outlineHoverBg);
    root.style.setProperty("--btn-outline-hover-text", theme.buttons.outlineHoverText);
  }

  if (theme.forms) {
    root.style.setProperty("--input-height", theme.forms.inputHeight);
    root.style.setProperty("--input-padding-x", theme.forms.inputPaddingX);
    root.style.setProperty("--input-padding-y", theme.forms.inputPaddingY);
    root.style.setProperty("--input-radius", theme.forms.inputRadius);
    root.style.setProperty("--input-bg", theme.forms.inputBackground);
    root.style.setProperty("--input-text", theme.forms.inputText);
    root.style.setProperty("--input-border", theme.forms.inputBorder);
    root.style.setProperty("--input-border-hover", theme.forms.inputBorderHover);
    root.style.setProperty("--input-placeholder", theme.forms.inputPlaceholder);
    root.style.setProperty("--input-focus-border", theme.forms.inputFocusBorder);
    root.style.setProperty("--input-focus-shadow", theme.forms.inputFocusShadow);
    root.style.setProperty("--input-disabled-bg", theme.forms.inputDisabledBackground);
    root.style.setProperty("--input-disabled-text", theme.forms.inputDisabledText);
    root.style.setProperty("--textarea-min-height", theme.forms.textareaMinHeight);
  }

  if (theme.modal) {
    root.style.setProperty("--modal-sm", theme.modal.sm);
    root.style.setProperty("--modal-md", theme.modal.md);
    root.style.setProperty("--modal-lg", theme.modal.lg);
  }

  if (theme.darkMode) {
    const darkModeStyles = `.dark { --background: ${theme.darkMode.background}; --surface: ${theme.darkMode.surface}; --card: ${theme.darkMode.card}; --text: ${theme.darkMode.text}; --text-secondary: ${theme.darkMode.textSecondary}; --text-muted: ${theme.darkMode.textMuted}; --border: ${theme.darkMode.border}; --input-bg: ${theme.darkMode.inputBackground}; --input-text: ${theme.darkMode.inputText}; --input-border: ${theme.darkMode.inputBorder}; --input-placeholder: ${theme.darkMode.inputPlaceholder}; --input-disabled-bg: ${theme.darkMode.inputDisabledBackground}; }`;
    const existingStyle = document.getElementById("blueprint-dark-vars");
    if (existingStyle) { existingStyle.innerHTML = darkModeStyles; }
    else { const style = document.createElement("style"); style.id = "blueprint-dark-vars"; style.textContent = darkModeStyles; document.head.appendChild(style); }
  }
};

export default applyTheme;
