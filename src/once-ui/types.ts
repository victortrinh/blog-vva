type StaticSpacingToken = 
| "0"
| "1"
| "2"
| "4"
| "8"
| "12"
| "16"
| "20"
| "24"
| "32"
| "40"
| "48"
| "56"
| "64"
| "80"
| "104"
| "128"
| "160";

type TShirtSizes = 
| "xs"
| "s"
| "m"
| "l"
| "xl";

type ResponsiveSpacingToken = TShirtSizes;

export type ShadowSize = TShirtSizes;

export type SpacingToken = StaticSpacingToken | ResponsiveSpacingToken;

export type ColorScheme = 
| "neutral"
| "brand"
| "accent"
| "info"
| "danger"
| "warning"
| "success";

export type ColorWeight = 
| "weak"
| "medium"
| "strong";

export type RadiusSize = TShirtSizes | "full";

export type RadiusNest = 
| "4"
| "8";

type TextType = 
| "body" 
| "heading" 
| "display" 
| "label"
| "code";

export type TextWeight =
| "default"
| "strong";

export type TextSize = TShirtSizes

export type TextVariant = `${TextType}-${TextWeight}-${TextSize}`