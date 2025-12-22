import { useEffect } from 'react';
import { useBrandStore } from '@/store/useBrandStore';

const GlobalStyle = () => {
  const { typography } = useBrandStore();

  useEffect(() => {
    const styleId = 'dynamic-font-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    let css = '';

    // Injeta a Fonte Principal
    if (typography.primaryFontUrl) {
      css += `
        @font-face {
          font-family: 'CustomPrimary';
          src: url('${typography.primaryFontUrl}');
          font-weight: 100 900;
          font-display: swap;
        }
        :root {
          --font-heading: 'CustomPrimary', sans-serif !important;
          /* Se NÃO houver fonte secundária definida, a primária assume o corpo do site todo */
          ${!typography.secondaryFontUrl ? "--font-body: 'CustomPrimary', sans-serif !important;" : ""}
        }
      `;
    }

    // Injeta a Fonte Secundária
    if (typography.secondaryFontUrl) {
      css += `
        @font-face {
          font-family: 'CustomSecondary';
          src: url('${typography.secondaryFontUrl}');
          font-weight: 100 900;
          font-display: swap;
        }
        :root {
          --font-body: 'CustomSecondary', sans-serif !important;
        }
      `;
    }

    // Registra as Fontes Extras (para que elas apareçam na seção de Tipografia)
    if (typography.extraFonts) {
      typography.extraFonts.forEach((font, index) => {
        if (font.url) {
          css += `
            @font-face {
              font-family: '${font.name.replace(/\s+/g, '')}'; /* Remove espaços do nome */
              src: url('${font.url}');
              font-weight: 100 900;
              font-display: swap;
            }
          `;
        }
      });
    }

    styleElement.textContent = css;

  }, [typography.primaryFontUrl, typography.secondaryFontUrl, typography.extraFonts]);

  return null;
};

export default GlobalStyle;