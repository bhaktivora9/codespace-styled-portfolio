# VS Code Theme System Documentation

## Theming

The template supports both light and dark themes. Colors are defined using CSS variables in `src/styles/index.css`. You can customize:

- Primary colors
- Accent colors  
- Background colors
- Text colors
- Border colors

For detailed understanding of theme usage please refer to the color reference below.

## Color Reference

### Background Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-bg-primary` | ![](https://img.shields.io/badge/-ffffff-ffffff?style=flat-square) `#ffffff` | ![](https://img.shields.io/badge/-1e1e1e-1e1e1e?style=flat-square) `#1e1e1e` | Main canvas color |
| `--vscode-bg-secondary` | ![](https://img.shields.io/badge/-f3f3f3-f3f3f3?style=flat-square) `#f3f3f3` | ![](https://img.shields.io/badge/-2d2d30-2d2d30?style=flat-square) `#2d2d30` | Panels and sidebars |
| `--vscode-bg-tertiary` | ![](https://img.shields.io/badge/-e8e8e8-e8e8e8?style=flat-square) `#e8e8e8` | ![](https://img.shields.io/badge/-333333-333333?style=flat-square) `#333333` | Elevated components |
| `--vscode-bg-quaternary` | ![](https://img.shields.io/badge/-f8f8f8-f8f8f8?style=flat-square) `#f8f8f8` | ![](https://img.shields.io/badge/-252526-252526?style=flat-square) `#252526` | Deeper nesting areas |
| `--vscode-bg-panel` | ![](https://img.shields.io/badge/-f0f0f0-f0f0f0?style=flat-square) `#f0f0f0` | ![](https://img.shields.io/badge/-37373d-37373d?style=flat-square) `#37373d` | Distinct panel backgrounds |

### Text Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-text-primary` | ![](https://img.shields.io/badge/-333333-333333?style=flat-square) `#333333` | ![](https://img.shields.io/badge/-cccccc-cccccc?style=flat-square) `#cccccc` | Main text for optimal readability |
| `--vscode-text-secondary` | ![](https://img.shields.io/badge/-545454-545454?style=flat-square) `#545454` | ![](https://img.shields.io/badge/-ADADAD-ADADAD?style=flat-square) `#ADADAD` | Secondary information text |
| `--vscode-text-tertiary` | ![](https://img.shields.io/badge/-666666-666666?style=flat-square) `#666666` | ![](https://img.shields.io/badge/-858585-858585?style=flat-square) `#858585` | Supporting text elements |
| `--vscode-text-muted` | ![](https://img.shields.io/badge/-999999-999999?style=flat-square) `#999999` | ![](https://img.shields.io/badge/-6a6a6a-6a6a6a?style=flat-square) `#6a6a6a` | Hints and disabled states |

### Border Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-border` | ![](https://img.shields.io/badge/-d4d4d4-d4d4d4?style=flat-square) `#d4d4d4` | ![](https://img.shields.io/badge/-3C3C40-3C3C40?style=flat-square) `#3C3C40` | General border color |

### Primary Accent Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-accent` | ![](https://img.shields.io/badge/-C3504B-C3504B?style=flat-square) `#C3504B` | ![](https://img.shields.io/badge/-D95852-D95852?style=flat-square) `#D95852` | Primary accent color |
| `--vscode-blue` | ![](https://img.shields.io/badge/-0066cc-0066cc?style=flat-square) `#0066cc` | ![](https://img.shields.io/badge/-3F8FBA-3F8FBA?style=flat-square) `#3F8FBA` | Blue accent |
| `--vscode-green` | ![](https://img.shields.io/badge/-2D8162-2D8162?style=flat-square) `#2D8162` | ![](https://img.shields.io/badge/-3F7F60-3F7F60?style=flat-square) `#3F7F60` | Green accent |
| `--vscode-yellow` | ![](https://img.shields.io/badge/-BAA83F-BAA83F?style=flat-square) `#BAA83F` | ![](https://img.shields.io/badge/-CABB63-CABB63?style=flat-square) `#CABB63` | Yellow accent |
| `--vscode-red` | ![](https://img.shields.io/badge/-B22222-B22222?style=flat-square) `#B22222` | ![](https://img.shields.io/badge/-DE4F4F-DE4F4F?style=flat-square) `#DE4F4F` | Red accent |

### Other Supported Accent Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-orange` | ![](https://img.shields.io/badge/-BA6A3F-BA6A3F?style=flat-square) `#BA6A3F` | ![](https://img.shields.io/badge/-CA8763-CA8763?style=flat-square) `#CA8763` | Orange accent |
| `--vscode-violet` | ![](https://img.shields.io/badge/-6900D1-6900D1?style=flat-square) `#6900D1` | ![](https://img.shields.io/badge/-C48AFF-C48AFF?style=flat-square) `#C48AFF` | Violet accent |
| `--vscode-purple` | ![](https://img.shields.io/badge/-615FA0-615FA0?style=flat-square) `#615FA0` | ![](https://img.shields.io/badge/-6897EE-6897EE?style=flat-square) `#6897EE` | Purple accent |
| `--vscode-teal` | ![](https://img.shields.io/badge/-0891b2-0891b2?style=flat-square) `#0891b2` | ![](https://img.shields.io/badge/-0891b2-0891b2?style=flat-square) `#0891b2` | Teal accent |
| `--vscode-pink` | ![](https://img.shields.io/badge/-EC4899-EC4899?style=flat-square) `#EC4899` | ![](https://img.shields.io/badge/-F472B6-F472B6?style=flat-square) `#F472B6` | Pink accent |
| `--vscode-indigo` | ![](https://img.shields.io/badge/-3F51BA-3F51BA?style=flat-square) `#3F51BA` | ![](https://img.shields.io/badge/-6372CA-6372CA?style=flat-square) `#6372CA` | Indigo accent |
| `--vscode-emerald` | ![](https://img.shields.io/badge/-10B981-10B981?style=flat-square) `#10B981` | ![](https://img.shields.io/badge/-34D399-34D399?style=flat-square) `#34D399` | Emerald accent |
| `--vscode-amber` | ![](https://img.shields.io/badge/-F59E0B-F59E0B?style=flat-square) `#F59E0B` | ![](https://img.shields.io/badge/-FBBF24-FBBF24?style=flat-square) `#FBBF24` | Amber accent |
| `--vscode-rose` | ![](https://img.shields.io/badge/-F43F5E-F43F5E?style=flat-square) `#F43F5E` | ![](https://img.shields.io/badge/-CA6372-CA6372?style=flat-square) `#CA6372` | Rose accent |
| `--vscode-sky` | ![](https://img.shields.io/badge/-0EA5E9-0EA5E9?style=flat-square) `#0EA5E9` | ![](https://img.shields.io/badge/-38BDF8-38BDF8?style=flat-square) `#38BDF8` | Sky accent |
| `--vscode-coral` | ![](https://img.shields.io/badge/-FF7F7F-FF7F7F?style=flat-square) `#FF7F7F` | ![](https://img.shields.io/badge/-FF9999-FF9999?style=flat-square) `#FF9999` | Coral accent |
| `--vscode-red-shade` | ![](https://img.shields.io/badge/-CB6762-CB6762?style=flat-square) `#CB6762` | ![](https://img.shields.io/badge/-CB6762-CB6762?style=flat-square) `#CB6762` | Red shade variant |
## Hover State Colors

Each accent color has corresponding hover variants with darker tones for better interaction feedback. The hover colors are automatically generated with reduced opacity and darker hues.

## Focus Ring Colors

Focus ring colors use 40% opacity variants of the base colors to provide accessible focus indicators while maintaining visual hierarchy.

## Utility Classes Available

### Background Classes
- `.bg-vscode-primary`, `.bg-vscode-secondary`, `.bg-vscode-tertiary`
- `.bg-vscode-[color]` for all accent colors (e.g., `.bg-vscode-blue`)

### Text Classes  
- `.text-vscode-primary`, `.text-vscode-secondary`, `.text-vscode-tertiary`
- `.text-vscode-[color]` for all accent colors (e.g., `.text-vscode-green`)

### Border Classes
- `.border-vscode`, `.border-vscode-accent`
- `.border-vscode-[color]` for all accent colors (e.g., `.border-vscode-yellow`)

### Interactive States
- `.hover:bg-vscode-[color]:hover` for hover backgrounds
- `.hover:text-vscode-[color]:hover` for hover text colors
- `.focus:ring-vscode-[color]:focus` for focus ring colors

## Usage Examples

```css
/* Primary button */
.btn-primary {
  background-color: var(--vscode-accent);
  color: white;
}

/* File tab with dynamic color */
.file-tab-js {
  border-top: 3px solid var(--vscode-yellow);
  color: var(--vscode-yellow);
}

/* Error state */
.error-message {
  background: var(--vscode-bg-secondary);
  border-left: 4px solid var(--vscode-red);
  color: var(--vscode-text-primary);
}
```

## Font Family

The theme uses the following font stack:

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
```

## Theme Customization Guide

### How to Customize Colors

1. **Open the theme file**: Navigate to `src/styles/index.css`
2. **Locate the color variables**: Find the `:root` section for light theme or `.dark` section for dark theme
3. **Modify the hex values**: Change any color variable to your desired hex code
4. **Save and reload**: Your changes will be applied automatically

### Example Customization

```css
/* Custom brand colors */
:root {
  --vscode-accent: #FF6B6B;        /* Custom red accent */
  --vscode-blue: #4ECDC4;          /* Custom teal blue */
  --vscode-green: #45B7D1;         /* Custom blue-green */
}

.dark {
  --vscode-accent: #FF8E8E;        /* Lighter red for dark mode */
  --vscode-blue: #6EDDD6;          /* Lighter teal for dark mode */
  --vscode-green: #67C3E3;         /* Lighter blue-green for dark mode */
}
```

### Best Practices

- **Maintain contrast ratios**: Ensure text remains readable on all backgrounds
- **Test both themes**: Always check your customizations in both light and dark modes
- **Use consistent color families**: Keep related colors harmonious
- **Consider accessibility**: Follow WCAG guidelines for color contrast

### Creating New Accent Colors

To add a new accent color:

1. **Define the base color**:
   ```css
   :root {
     --vscode-custom: #YOUR_HEX_CODE;
     --vscode-custom-hover: #DARKER_HEX_CODE;
     --vscode-custom-focus: #YOUR_HEX_CODE40;
   }
   ```

2. **Add utility classes**:
   ```css
   .bg-vscode-custom { background-color: var(--vscode-custom); }
   .text-vscode-custom { color: var(--vscode-custom); }
   .border-vscode-custom { border-color: var(--vscode-custom); }
   ```

3. **Include hover states**:
   ```css
   .hover\:bg-vscode-custom:hover { background-color: var(--vscode-custom-hover); }
   ```

## Animation Support

The theme includes several built-in animations:

- `animate-wave` - Wave hand animation
- `animate-gradient-x` - Gradient background animation  
- `animate-breathe` - Subtle breathing effect
- `animate-glow` - Glowing effect
- `animate-soft-bounce` - Gentle bounce animation
- Various progress and loading animations
