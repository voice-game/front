# 🎙🎙 **Voice Game** 🎙🎙

<!-- ![Main](./README_assets/logo.png) -->

## 📌 &nbsp; What is Voice Game?

voice game은 플레이어의 소리를 측정하여 플레이 할 수 있는 **니 게임들로** 으로 구성되어 있으며, **웹에서 즐길 수 있습니다.**

<br>

## 🕹 &nbsp; **[Play Voice Game](https://voicegame.fun)**

## <br>

## 📌 &nbsp; Description

### **`Little Forest`** 음정 높낮이로 길을 만들고, 지형을 움직여 고슴도치를 목표 지점까지 보내는 게임입니다.

[How to Play]() ?  
<img src="./README_assets/littleForest_gif.gif" alt="LittleForest" width="40%" />

### **`Monster Escape`** 소리 크기로 적 몬스터들을 피해 요괴 소굴을 탈출하는 게임입니다.

 <img src="./README_assets/monsterEscape_gif.gif" alt="MonsterEscape" width="40%" />

 <br>

### **`Energy Battle`** 소리 크기로 에너지파를 만들어 승부를 가르는 대전 게임입니다.

 <img src="./README_assets/energyBattle_gif.gif" alt="EnergyBattle" width="40%" />

## <br>

## 📌 &nbsp; Github Repository

### 📁 &nbsp; [**Frontend** Repository](https://github.com/voice-game/front)

### 📁 &nbsp; [**Backend** Repository](https://github.com/voice-game/back)

## <br>

---

<br>
<br>

## 👉 &nbsp; Index

### 🤔 &nbsp; [Motivation](#-Motivation)

### 📆 &nbsp; [Schedule](#-Schedule)

### 🧑🏻‍💻 &nbsp; [Contributor](#-Contributor)

### 🛠 &nbsp; [Stack](#-TechStack)

### 🔎 &nbsp; [Feature](#-Feature)

### 🧗‍♀️ &nbsp; [Challenge](#-Challenge)

### ✍️ &nbsp; [History](#-Hisotry)

### 🙇🏻‍♂️ &nbsp; [Conclusion](#-Conclusion)

## <br>

---

<br>
<br>

## Motivation

팀원 모두 게임 제작에 대한 흥미가 있어 게임 제작을 결정하게 되었습니다.

서비스되고 있는 게임 중 음성인식 기반의 게임에 영감을 받아  
음성을 다양하게 활용하기 위해서 음의 크기, 음의 높이 등으로 나누어 3가지 게임을 제작하였습니다.

<br>
<br>

<p>
  <img src="./README_assets/littleForest_gif.gif" alt="LittleForest" width="32%" />
  <img src="./README_assets/monsterEscape_gif.gif" alt="MonsterEscape" width="32%" />
  <img src="./README_assets/energyBattle_gif.gif" alt="EnergyBattle" width="32%" />
</p>

팀원 모두 Canvas로 게임을 만들어보고 싶어했습니다. 이에 어떤 게임을 만들까 고민하면서, <span style="color: brown; font-weight: 600 ">게임은 꼭 키보드 / 마우스로 해야할까???</span>라는 생각이 들었습니다. 이러한 의문에서 시작하여 **음성 기반 게임** 을 제작하기로 결정하였습니다.  
소리는 높이, 크기, 모양 세 요소로 이루어져 있기때문에, 하나의 게임을 만들기보단 소리 높이, 크기의 특색을 각각 살리는게 좋다 생각하였습니다. 그 결과 미니게임 3종을 만들기로 하였습니다.

<br>
<br>

## Schedule

### **`2021.04.12~04.30 21일 프로젝트`**

- 1주차 - 프로젝트 주제 선정, Mock-Up 제작, DB-Schema 설계, 구현 가능 여부 검토
- 2주차 - Audio Context(Web Api) 이용하여 음성 인식 기능 구현, Canvas Animation, Socket 통신 구현
- 3주차 - Netlify & AWS 배포, 테스트 코드 작성, 코드 리팩터링

<br>
<br>

## Contributor

### **`서성주`**

### **`권민호`**

### **`김재덕`**

<br>
<br>

## TechStack

<details>
  <summary><span style="font-size: 16px; font-weight: 600">Front End</span></summary>
  <div markdown="1">

| Stack                 | Remarks                                                |
| :-------------------- | :----------------------------------------------------- |
| ES2015+               | TBD(To Be Decided)                                     |
| React                 | TBD                                                    |
| React-router-dom      | TBD                                                    |
| Redux-thunk           | Redux 스토어의 비동기 작업(서버요청, 이미지 로딩) 관리 |
| Styled-components     | 공통 컴포넌트 재사용성                                 |
| Firebase              | TBD                                                    |
| Socket.io-client      | 게임 멀티플레이를 위한 실시간 통신                     |
| Pusher-js             | 실시간 DB 변화 구독                                    |
| Jest                  | React Component Test                                   |
| Enzyme                | React Component Test                                   |
| React-testing-library | TBD                                                    |
| Redux-logger          | TBD                                                    |

  <br>
  </div>
</details>

<details>
  <summary><span style="font-size: 16px; font-weight: 600">Back End<span> </summary>
  <div markdown="1">

| Stack                | Remarks                            |
| :------------------- | :--------------------------------- |
| NodeJS               | JavaScript Runtime으로 npm         |
| Express              | JavaScript 서버 애플리케이션       |
| MongoDB              | TBD                                |
| Mongoose             | MongoDB JavaScript ODM             |
| JWT (JSON Web Token) | 토큰 기반 인증                     |
| Soket.io             | 게임 멀티플레이를 위한 실시간 통신 |
| Pusher               | 실시간 DB 변화 알림                |
| Mocha                | 서버 엔드포인트 테스트             |
| supertest            | 서버 엔드포인트 테스트             |
| AWS                  | TBD                                |

  <br>
  </div>
</details>

<br>
<br>

## Feature

게임설명 쓰기...

<br>
<br>

## Challenge

### **`Volume Meter`**

미니 게임 Monster Escape와 Energy Effect는 소리 크기를 게임 입력으로 받아, 게임 내 캐릭터를 조작합니다. 이전에 음성인식을 해주는 Web Speech API 사용했던 경험이 있었기에, 볼륨 측정 또한 Web API에 있을 것이라 판단하였습니다. 하지만 기대와 달리 Web API는 마이크 데이터만 센싱할 뿐 별도의 볼륨 측정 기능은 없었기에 게임 주제를 바꾸어야하나 고민하였습니다. 하지만 Web API가 Audio Context 객체를 통해 마이크 입력을 FFT로 계측해주기 때문에, 이를 프로세싱하여 볼륨 측정 함수를 만들기로 하였습니다. FFT(Fast Fourier Transformation)란 시간영역의 디지털 신호를 주파수 영역에서 분석하는 기법입니다. 따라서 <span style="color: blue">FFT를 통해 마이크에 들어온 플레이어의 목소리를 주파수별 크기로 분해하고 이들을 가공하여 볼륨을 구할 수 있었습니다.</span> 처음에는 개념이 낯설어 프로젝트를 진행하는데 어려웠지만, 프로그래밍을 통해 다양한 분야를 접하고 더나아가 구현할 수 있었던 점이 흥미로웠습니다.

### **`Pitch Detector`**

Audio Context (Web Api)  
음성인식을 위해 Web Api로 제공되는 Audio Context를 사용하였습니다.
볼륨과 주파수 2가지 정보가 필요했는데
볼륨의 경우는 Adio Context가 변화가 적은 지속적인 음에 대한 인식이 끊어지는 문제
주파수의 경우 Audio Context를 통해 얻을 수 있는
FFT(고속 푸리에 변환)으로 분석된 주파수 정보를 가공하여 사용하는 것에서 문제가 생겼다.

이를 해결하기 위해
~~

### **`Canvas`**

게임 플레이 화면을 보여주기 위해, Javascript를 기반으로 HTML에 다양한 애니메이션을 보여줄 수 있는 Canvas를 사용하였습니다. 원하는 선/도형/이미지를 그리고, 애니메이션 효과를 넣기 위해 requestAnimationFrame함수를 재귀로 실행하는 등 Canvas 개념 자체는 어렵지 않았습니다. 하지만 게임 특성 상 아래와 같이 다양한 상황(점프 & 낙하 / 횡이동 & 종이동 / 충돌 & 접촉 / 캐릭터 사망 등)이 있었기에, 이들을 고려하여 어떻게 Canvas에 그릴지 로직을 만드는 것이 어려웠습니다.

- 생동감 있는 게임 캐릭터 구현을 위해 Sprite 이미지를 사용하였기에, 기본 60fps로 실행되는 requestAnimationFrame 함수에서 이미지 프레임에 맞게 Canvas Drawing이 실행되도록 <span style="color: blue">프레임 제어 로직</span>이 필요했습니다.
- 캐릭터가 점프를 했을때 아래와 같은 과정을 거치기 때문에, Canvas Y 축(수직 축)에 대해 동역학 모델링에서 사용되는 <span style="color: blue">중력모델</span>을 구현해야 했습니다.
  ```
  점프 → 빠르게 올라감 → 점점 느려짐 → 멈춤 → 느리게 떨어짐 → 점점 빨라짐 → 착지
  ```
- 지면 접촉 및 장애물 충돌 구현을 위해 캐릭터 좌표(x, y)와 지면 및 장애물 좌표를 다앙햔 경우를 고려하여 로직을 만들어야 했습니다.
- 멀티플레이를 할 경우, 플레이어마다 브라우저 화면의 크기가 다르기 때문에 소켓통신에 절대좌표를 보내면 캐릭터가 이상한 위치에 그려지게 됩니다. 따라서 캐릭터 위치를 Canvas 크기에 대해 정규화하여 소켓통신을 해야했습니다.

이처럼 Canvas를 다루는게 까다롭고 어려웠지만, 게임, 웹 디자인 등에 쓰이는 Canvas의 활용도에 대해 배울 수 있었던 좋은 경험이었습니다.

### **`Custom Hook`**

...

### **`Socket IO`**

...

### **`객체 지향 프로그램`**

...

### **`움직이는 이미지`**

...

<br>
<br>

## Deploy

### **`Frontend`**

### **`Backend`**

<br>
<br>

## History

### **`1주차`**

### **`2주차`**

### **`3주차`**

<br>
<br>

## Conclusion

### **`공통`**

### **`서성주`**

### **`권민호`**

### **`김재덕`**

<br>
<br>

## Contact

### **`서성주`** canwefly89@gmail.com

### **`권민호`** minhob38@gmail.com

### **`김재덕`** jdcoder9@gmail.com
