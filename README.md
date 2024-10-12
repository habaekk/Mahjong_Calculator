# 📜 Mahjong Calculator

[English](https://github.com/habaekk/Mahjong_Calculator) | [한국어](https://github.com/habaekk/Mahjong_Calculator/blob/master/README_kr.md)

  

This project is a web application designed to easily calculate Japanese Mahjong scores. It is built using React and Recoil to assist in calculating and managing scores during Mahjong games.

[Go to the webpage](https://mahjong-calculator-test.vercel.app/)

## ✨ Key Features
-   **Score Calculation**: Automatically calculates the score by selecting the number of fans and fus.
-   **Dealer Management**: Set the current dealer and manage the extension count based on consecutive wins.
-   **Richii and Tenpai Status**: Displays and manages the Richii and Tenpai status of each player.
-   **Draw Processing**: Automatically calculates the score based on the number of Tenpai players in the case of a draw.
-   **Score Edit Mode**: Allows manual score adjustments for each player during the game.

## 🚀 Installation Instructions
1. **Clone the repository**
	```bash
	git clone https://github.com/habaekk/mahjong-calculator.git
	cd mahjong-calculator
	```
2. Install dependencies
	```bash
	npm install
	```
	or
	```bash
	yarn install
	```
## 🔥 Running the Application
```bash
npm start
```
or
```bash
yarn start
```
The application will run by default on `http://localhost:3000`.

## 📂 Project Structure
```plain text
mahjong-cal/
├── package.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.js
    ├── index.css
    ├── index.js
    ├── components/
    │   ├── ControlPanel.css
    │   ├── ControlPanel.js
    │   ├── Modal.css
    │   ├── Modal.js
    │   ├── Player.css
    │   ├── Player.js
    │   ├── ScoreBoard.css
    │   ├── ScoreBoard.js
    │   └── ScoreGrid.js
    ├── recoil/
    │   ├── gameState.js
    │   ├── playerState.js
    │   ├── reachCountState.js
    │   └── tenpaiCountState.js
    ├── score_data/
    │   ├── ron_ja.js
    │   ├── ron_oya.js
    │   ├── tsumo_ja_ja.js
    │   ├── tsumo_ja_oya.js
    │   └── tsumo_oya.js
    ├── useCalculateRon.js
    └── useCalculateTsu.js
```
## 📋 Code Overview
### `App.js`

-   This is the main component of the application, managing the overall game state and player states.
-   It displays and manages player scores, dealer status, Richii, and Tenpai status.
-   A modal window allows selecting fans and fus to calculate scores.

### `Modal.js`

-   A grid-based modal component where users can select the number of fans and fus.
-   Depending on the selected values, it uses the `useCalculateRon` or `useCalculateTsu` hook to calculate scores.

### `useCalculateRon.js` & `useCalculateTsu.js`

-   -   These are custom hooks that calculate scores for Ron and Tsumo scenarios.
-   Score data is pulled from JSON files in the `score_data` folder.
-   The calculated scores are reflected in each player's state.

### `recoil` Folder

-   Contains Recoil atoms and selectors for application state management.
-   `playersState`: Atom managing the state of the players.
-   `gameStateAtom`: Atom managing the overall game state (e.g., dealer, extension count).
-   `reachCountState` & `tenpaiCountState`: Selectors for calculating the number of players in Richii or Tenpai states.

## 🛠️ Usage Instructions
-   -   **Player Click**:
    
    -   Click the player's position on the central grid to select the winner.
    -   In the case of Ron, click the winner and then the loser.
    -   In the case of Tsumo, only the winner is clicked.
-   **Select Fans and Fus**:
    
    -   Select the corresponding fans and fus in the modal window.
-   **Score Calculation**:
    
    -   Scores are automatically calculated and reflected in the players' scores based on the selected values.
-   **Change Dealer**:
    
    -   Use the "Dealer" button to change the current dealer when necessary.
-   **Manage Richii and Tenpai Status**:
    
    -   Use the "Richii" and "Tenpai" buttons to manage each player's status.
-   **Score Edit Mode**:
    
    -   Use the "Edit Score" button to manually adjust scores.
-   **Draw Processing**:
    
    -   Use the "Process Draw" button to automatically calculate scores during a draw scenario.

## 📋 Additional Information

-   This project is built on **React** and uses **Recoil** for state management.
-   The scoring logic follows standard Japanese Mahjong rules.
-   If you have suggestions or want to contribute, please open an issue or submit a PR.

## 🛡️ License
