const IMAGE_BASE_URL = "http://openweathermap.org/img/wn/";

export default function setElementTextContentValue(
  selector,
  value,
  { parentElement = document } = {}
) {
  const element = parentElement.querySelector(`[data-${selector}]`);
  element.textContent = value;
}

export function setImage(
  selector,
  icon,
  { size = "@2x" } = {},
  parentElement = document
) {
  const image = parentElement.querySelector(`${selector}`);
  image.src = `${IMAGE_BASE_URL}${icon}${size}.png`;
}
