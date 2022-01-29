ℹ️ This is a fork/port of [the Vue implementation](https://github.com/yyx990803/vue-wordle) Evan You made. All credits goes to him.

# Solid Wordle

A Solid implementation of the [Wordle game](https://www.powerlanguage.co.uk/wordle/).

This repository is open sourced for learning purposes only - the original creator(s) of Wordle own all applicable rights to the game itself.

[Live demo](https://solid-wordle.netlify.app/)

## TODOs and ideas

- [x] Add dark mode via tailwind `dark` class and link it to the dark toggle in the settings page
- [ ] Add transition in and out on `GamePage`, not sure if CSS is enough for that one
- [ ] Add colorblind/accessibility features via the the toggle in the settings page
- [ ] Add hard mode via the the toggle in the settings page
- [ ] Add other keyboard layout than QWERTY (AZERTY, QWERTZ, DVORAK, etc.)
- [ ] Add words in other languages (french, italian, dutch, etc.)
- [ ] Translate the app in other languages
- [ ] Lazy load the list of words (it's not needed on initial load)
- [ ] Refactor the code to fit more the Solid mentality
- [ ] Make sure the app works on most devices (responsive and touch)
- [ ] Add statistics
- [ ] Add word guesses and stats in the localeStorage
- [ ] Add confetti when you guessed the word
- [ ] Find a better name because apparently [the Swedes](https://github.com/krawaller/swordle) stole the name! (JK, I love their implemantation)
- [ ] Add a "Play again" button if the game is over and the user didn't find the word
- [ ] Add PWA support with update in a small notification similar to the solid-playground

## Contribute

### Requirements

- [pnpm](https://pnpm.io/)
- [node 16+](https://nodejs.org/en/)

### Getting started

- `git clone`
- `cd solid-wordle`
- `pnpm install`
- `pnpm dev`

### Guidelines

- All commit must follow [gitmoji](https://gitmoji.dev/)
- All dependencies must be installed/updated/deleted via [pnpm](https://pnpm.io/)
- You should probably not write a single a line of CSS, [tailwind](https://tailwindcss.com/) allows you to do about anything
- Don't go for one liners, clarity is the key of this project
