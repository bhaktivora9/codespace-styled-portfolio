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
| `--vscode-bg-primary` | `#ffffff` | `#1e1e1e` | Main canvas color |
| `--vscode-bg-secondary` | `#f3f3f3` | `#2d2d30` | Panels and sidebars |
| `--vscode-bg-tertiary` | `#e8e8e8` | `#333333` | Elevated components |
| `--vscode-bg-quaternary` | `#f8f8f8` | `#252526` | Deeper nesting areas |
| `--vscode-bg-panel` | `#f0f0f0` | `#37373d` | Distinct panel backgrounds |

### Text Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-text-primary` | `#333333` | `#cccccc` | Main text for optimal readability |
| `--vscode-text-secondary` | `#545454` | `#ADADAD` | Secondary information text |
| `--vscode-text-tertiary` | `#666666` | `#858585` | Supporting text elements |
| `--vscode-text-muted` | `#999999` | `#6a6a6a` | Hints and disabled states |

### Border Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-border` | `#d4d4d4` | `#3C3C40` | General border color |

### Primary Accent Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-accent` | `#C3504B` | `#D95852` | Primary accent color |
| `--vscode-blue` | `#0066cc` | `#3F8FBA` | Blue accent |
| `--vscode-green` | `#2D8162` | `#3F7F60` | Green accent |
| `--vscode-yellow` | `#BAA83F` | `#CABB63` | Yellow accent |
| `--vscode-red` | `#B22222` | `#DE4F4F` | Red accent |

### Extended Accent Colors

| Color Variable | Light Theme | Dark Theme | Usage |
|---|---|---|---|
| `--vscode-orange` | `#BA6A3F` | `#CA8763` | Orange accent |
| `--vscode-violet` | `#6900D1` | `#C48AFF` | Violet accent |
| `--vscode-purple` | `#615FA0` | `#6897EE` | Purple accent |
| `--vscode-teal` | `#0891b2` | `#0891b2` | Teal accent |
| `--vscode-pink` | `#EC4899` | `#F472B6` | Pink accent |
| `--vscode-indigo` | `#3F51BA` | `#6372CA` | Indigo accent |
| `--vscode-emerald` | `#10B981` | `#34D399` | Emerald accent |
| `--vscode-amber` | `#F59E0B` | `#FBBF24` | Amber accent |
| `--vscode-rose` | `#F43F5E` | `#CA6372` | Rose accent |
| `--vscode-sky` | `#0EA5E9` | `#38BDF8` | Sky accent |
| `--vscode-coral` | `#FF7F7F` | `#FF9999` | Coral accent |
| `--vscode-red-shade` | `#CB6762` | `#CB6762` | Red shade variant |

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
