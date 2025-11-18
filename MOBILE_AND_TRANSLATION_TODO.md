# Mobile Responsiveness & Translation Implementation

## Completed ✅
1. Created LanguageContext with French and Arabic translations
2. Created LanguageSwitcher component
3. Added LanguageProvider to App.tsx

## To Complete:

### 1. Add Language Switcher to Header
- Place next to cart icon (Panier)
- Show FR/AR buttons
- Keep layout LTR (left-to-right) even in Arabic

### 2. Update Menu Page
- Add `useLanguage()` hook
- Replace hardcoded French text with `t('key')` function
- Make responsive for mobile/tablet:
  - Stack progress steps vertically on mobile
  - Make people/meals selection grid responsive
  - Adjust plan cards for mobile (1 column on mobile, 2 on tablet, 3 on desktop)

### 3. Update Header Component
- Add LanguageSwitcher component
- Position: Left of cart icon
- Mobile: Show as icons only

### 4. Mobile Responsive CSS Updates Needed:
```css
/* Progress steps - stack on mobile */
@media (max-width: 768px) {
  .progress-steps { flex-direction: column; }
}

/* People/meals selection - 2 columns on mobile */
@media (max-width: 640px) {
  .selection-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Plans - 1 column on mobile, 2 on tablet, 3 on desktop */
@media (max-width: 640px) {
  .plans-grid { grid-template-columns: 1fr; }
}
@media (min-width: 641px) and (max-width: 1024px) {
  .plans-grid { grid-template-columns: repeat(2, 1fr); }
}
```

### 5. Components to Update with Translations:
- Header.tsx
- Menu.tsx
- AvailableDishes.tsx
- CartPopup.tsx
- HeroSection.tsx
- Footer.tsx

### 6. Keep Arabic LTR
- Do NOT add `dir="rtl"` to any elements
- Arabic text will display naturally but layout stays left-to-right
- This is already handled by not adding RTL directives

## Quick Implementation Steps:

1. Update Header to include LanguageSwitcher
2. Update Menu page with translations and responsive classes
3. Test on mobile/tablet viewports
4. Update remaining components with translation keys
