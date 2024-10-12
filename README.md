# 📜 Mahjong Calculator
이 프로젝트는 오프라인에서 마작 점수를 쉽게 계산할 수 있는 웹 애플리케이션입니다. React와 Recoil을 사용하여 구현되었으며, 마작 게임 중 점수 계산과 관리에 도움을 줍니다.

[웹페이지 바로가기](https://mahjong-calculator-test.vercel.app/)

## ✨ 주요 기능
-   **점수 계산**: 판수와 부수를 선택하여 자동으로 점수를 계산합니다.
-   **오야 관리**: 현재 오야를 설정하고, 연속 승리에 따른 연장 횟수를 관리합니다.
-   **리치 및 텐파이 상태**: 각 플레이어의 리치 및 텐파이 상태를 표시하고 관리합니다.
-   **유국 처리**: 유국 시 텐파이 인원 수에 따라 점수를 자동으로 계산합니다.
-   **점수 수정 모드**: 게임 중 언제든지 각 플레이어의 점수를 직접 수정할 수 있습니다.

## 🚀 설치 방법
1. **리포지토리 클론**
	```bash
	git clone https://github.com/habaekk/mahjong-calculator.git
	cd mahjong-calculator
	```
2. **패키지 설치**
	```bash
	npm install
	```
	혹은
	```bash
	yarn install
	```
## 🔥 실행 방법
```bash
npm start
```
또는
```bash
yarn start
```
애플리케이션은 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 📂 프로젝트 구조
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
## 📋 주요 코드 설명
### `App.js`

-   애플리케이션의 메인 컴포넌트로, 전체적인 게임 상태와 플레이어 상태를 관리합니다.
-   플레이어의 점수, 오야, 리치, 텐파이 상태를 표시하고 관리합니다.
-   모달 창을 통해 판수와 부수를 선택하여 점수를 계산합니다.

### `Modal.js`

-   판수와 부수를 선택할 수 있는 그리드 형태의 모달 컴포넌트입니다.
-   선택된 값에 따라 `useCalculateRon` 또는 `useCalculateTsu` 훅을 사용하여 점수를 계산합니다.

### `useCalculateRon.js` & `useCalculateTsu.js`

-   각각 론과 츠모 시의 점수를 계산하는 커스텀 훅입니다.
-   점수 데이터는 `score_data` 폴더 내의 JSON 파일에서 가져옵니다.
-   계산된 점수를 각 플레이어의 상태에 반영합니다.

### `recoil` 폴더

-   애플리케이션 상태 관리를 위한 Recoil atoms과 selectors가 포함되어 있습니다.
-   `playersState`: 플레이어들의 상태를 관리하는 atom.
-   `gameStateAtom`: 게임의 전반적인 상태(오야, 연장 횟수 등)를 관리하는 atom.
-   `reachCountState` & `tenpaiCountState`: 리치와 텐파이 상태의 플레이어 수를 계산하는 selector.

## 🛠️ 사용 방법
-   **플레이어 클릭**
    
    -   중앙의 그리드에서 플레이어 위치를 클릭하여 승자를 선택합니다.
    -   론인 경우 승자와 패자를 순서대로 클릭합니다.
    -   츠모인 경우 승자만 클릭합니다.
-   **판수와 부수 선택**
    
    -   모달 창에서 해당하는 판수와 부수를 선택합니다.
-   **점수 계산**
    
    -   선택한 값에 따라 자동으로 점수가 계산되어 플레이어들의 점수에 반영됩니다.
-   **오야 변경**
    
    -   필요 시 '오야' 버튼을 눌러 현재 오야를 변경할 수 있습니다.
-   **리치 및 텐파이 상태 관리**
    
    -   각 플레이어의 '리치', '텐파이' 버튼을 눌러 상태를 변경할 수 있습니다.
-   **점수 수정 모드**
    
    -   '점수 수정' 버튼을 눌러 직접 점수를 수정할 수 있습니다.
-   **유국 처리**
    
    -   '유국 실행' 버튼을 눌러 유국 시의 점수를 자동으로 계산합니다.

## 📋 추가 정보

-   이 프로젝트는 React를 기반으로 하고 있으며, 상태 관리를 위해 Recoil을 사용합니다.
-   점수 계산 로직은 일본 마작의 일반적인 룰을 따릅니다.
-   기여나 제안 사항이 있으시면 이슈나 PR을 남겨주세요.

## 🛡️ 라이선스
