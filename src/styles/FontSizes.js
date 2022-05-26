import normalizeText from './NormalizeText'

const FontSize = {
  h1: normalizeText(40), // Display
  h2: normalizeText(25), // Heading
  h3: normalizeText(24), // subheading
  h4: normalizeText(20), // title
  h5: normalizeText(18), // sub title
  caption: normalizeText(16), // caption
  body: normalizeText(14),
  bodySmall: normalizeText(12),
  label: normalizeText(12),
  smallLabel: normalizeText(10),
  Button: normalizeText(16),
}

export { FontSize }
