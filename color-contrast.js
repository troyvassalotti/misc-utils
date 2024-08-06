const rgbToHex = (rgb) => {
  const rgbRegex =
    /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
  let result;

  if ((result = rgbRegex.exec(rgb))) {
    const r = componentFromStr(result[1], result[2]);
    const g = componentFromStr(result[3], result[4]);
    const b = componentFromStr(result[5], result[6]);
    const hex =
      "0x" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);

    return hex;
  }
};

/**
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @link https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
const getContrast = (hexcolor) => {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "dark" : "light";
};

const componentFromStr = (numStr, percent) => {
  const num = Math.max(0, parseInt(numStr, 10));
  return percent
    ? Math.floor((255 * Math.min(100, num)) / 100)
    : Math.min(255, num);
};

/**
 * Check to see if the transparent header is active
 * @example From the Digital Humanities Lab
 */
const transparentHeader =
  document.querySelector(".c-transparent-header") || false;
if (transparentHeader) {
  document.addEventListener("DOMContentLoaded", () => {
    const humanitiesLabLogo = document.querySelector("humanities-lab-logo");
    const coverBackground = document.querySelector(
      "#hero .wp-block-cover__background",
    );
    let coverBackgroundColor =
      getComputedStyle(coverBackground).backgroundColor;
    const isHex = /"#"/.test(coverBackgroundColor);
    const darkClass = "u-color-foreground";
    const lightClass = "u-color-background";

    if (!isHex) coverBackgroundColor = rgbToHex(coverBackgroundColor).slice(2);

    if (getContrast(coverBackgroundColor) === "dark") {
      transparentHeader.classList.add(darkClass);
      if (heroContainer) heroContainer.classList.add(darkClass);
    } else {
      transparentHeader.classList.add(lightClass);
      if (heroContainer) heroContainer.classList.add(lightClass);
      humanitiesLabLogo.setAttribute("invert", true);
    }
  });
}
