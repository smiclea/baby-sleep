export const fitFontSizeToWidth = (
  text: string,
  fontFamily: string,
  maxWidth: number,
  maxFontSize = 100
): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return maxFontSize;
  }
  context.font = `${maxFontSize}px ${fontFamily}`;
  const textWidth = context.measureText(text).width;
  if (textWidth > maxWidth) {
    return fitFontSizeToWidth(text, fontFamily, maxWidth, maxFontSize - 1);
  }
  return maxFontSize;
};
