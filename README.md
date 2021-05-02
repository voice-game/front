# 🎙🎙 **Voice Game** 🎙🎙

![Main](./README_assets/logo.png)

## 📌 &nbsp; What is Voice Game?

Voice Game은 사용자의 목소리를 이용해 즐길 수있는 미니 게임들로 으로 구성된 게임 플랫폼입니다.

Voice Game은 크롬 브라우저에서 즐길 수 있습니다.

### 🕹 &nbsp; **[Go to Play Voice Game](https://voicegame.fun)**

<br>

## 📌 &nbsp; Game Overview

### **`Little Forest`**

음정 높낮이로 길을 만들고, 지형을 움직여 고슴도치를 목표 지점까지 보내는 게임입니다.

<img src="./README_assets/littleForest_gif.gif" alt="LittleForest" width="70%" />

### **`Monster Escape`**

소리 크기로 적 몬스터들을 피해 요괴 소굴을 탈출하는 게임입니다.

 <img src="./README_assets/monsterEscape_gif.gif" alt="MonsterEscape" width="70%" />

### **`Energy Battle`**

소리 크기로 에너지파를 만들어 승부를 가르는 대전 게임입니다.

 <img src="./README_assets/energyBattle_gif.gif" alt="EnergyBattle" width="70%" />

<br>

## 📌 &nbsp; Github Repository

📁 &nbsp; [**Frontend** Repository](https://github.com/voice-game/front)

📁 &nbsp; [**Backend** Repository](https://github.com/voice-game/back)

<br>

---

<br>

## Project Description

🤔 &nbsp; [Motivation](#-Motivation)

📆 &nbsp; [Schedule](#-Schedule)

🧑🏻‍💻 &nbsp; [Contributor](#-Contributor)

🛠 &nbsp; [Stack](#-TechStack)

🔎 &nbsp; [Feature](#-Feature)

🧗‍♀️ &nbsp; [Challenge](#-Challenge)

✍️ &nbsp; [History](#-Hisotry)

🙇🏻‍♂️ &nbsp; [Conclusion](#-Conclusion)

<br>

---

<br>

## Motivation

팀원 모두의 게임 제작과 Canvas에 대한 흥미로 게임을 주제로 결정하였습니다.

보다 특색있는 게임을 만들어보고자 음성인식 기반으로 조작되는 게임을 아이디어로 채택했습니다.

- 영감을 받은 게임 [One Hand Clapping](https://www.youtube.com/watch?v=gRGI1Oj9wFc)

사용자의 음성을 다양하게 활용하기 위해서 목소리의 크기와 높낮이로 나누어 3가지 미니게임을 제작하게 되었습니다.

- 높낮이, 크기, 높낮이와 크기

<br>

## Schedule

### **`2021.04.12~04.30 총 제작기간 21일`**

### **`1주차` - 설계 단계**

- 프로젝트 주제 선정
- Mock-Up 제작 [Mock-Up 보러가기](https://www.notion.so/canwefly89/Voice-Game-Mock-Up-38e0618894534a5c926a288ca185e467)
- DB-Schema 및 Redux State 구조 설계
- 구현 가능 여부 검토
  - 음성 인식 Web API 스터디
  - 주파수 인식 라이브러리 탐색
  - Canvas 기초 스터디
- 공통 컴포넌트 제작
- DB 연결 및 라우팅 기초 설계

### **`2주차` - 구현 단계**

**Front End**

- 게임별 컴포넌트 제작
- 기능 구현
  - Audio Context(Web Api) 이용하여 음성 인식 기능 구현
  - Canvas Animation 구현
  - Socket 통신 구현
- 게임 구현
  - Sprite Image 제작
  - 게임별 움직임 및 충돌 로직 등

**Back End**

- Data 연결 및 방-유저 상호작용 설계
  - Pusher로 방 변화 상태 실시간 전달

### **`3주차` - 마무리 단계**

- 구현 마무리
  - 게임 완성도를 위한 게임 내부 엣지케이스 핸들
  - 게임 맵 및 상호작용 추가 (little forest)
  - 방-유저 상호작용 이벤트 관련 엣지케이스 핸들
  - UX 향상을 위한 이미지 로딩 과정 최적화 (Loading Page 추가)
- 리팩토링
  - 전체 코드 일관성 유지
  - Prop-types 추가
- 테스트 코드 작성
- 프론트엔드, 백엔드 배포
  - Netlify, AWS Elastic Beanstalk

<br>

## Contributor

### **`서성주`** 유저 인증, 멀티플레이 환경 및 백엔드 구축, Energy Battle 구현

1. **유저 인증**  
   firebase를 활용한 구글 로그인  
   비회원 이용 기능
2. **백엔드 구축**  
   Node.js, Express, MongoDB, Mongoose
   DB Modeling: Player, Room
   모든 엔드포인트 로직
3. **멀티플레이 통신 구축**  
   Pusher: 모든 플레이어에게 방 상태 공유 (Full, Enter)
   socket: 멀티플레이 통신 구축
4. **Energy Battle 게임 제작**  
   Web API로 Volume Input 활용
   1:1 대전 멀티플레이 게임
5. **프론트엔드 서버 배포**  
   Netlify 활용
6. **전체 CSS Styling**  
   Styled Component 활용

### **`권민호`** Volume Input 핸들 로직, 백엔드 배포, 백엔드 테스트 코드, Monster Escape 구현

권민호의 역할에 대해 쓰면 됩니다.

### **`김재덕`** (한 줄 요약)

김재덕의 역할에 대해 쓰면 됩니다.

<br>

## TechStack

<details>
  <summary><span style="font-size: 16px; font-weight: 600">Front End</span></summary>
  <div markdown="1">

| Stack                 | Remarks                                              |
| :-------------------- | :--------------------------------------------------- |
| ES2015+               | -                                                    |
| React                 | MERN-STACK 기반 구현                                 |
| React-router-dom      | -                                                    |
| Redux-thunk           | Redux Store 비동기 작업 (서버요청, 이미지 로딩) 관리 |
| Styled-components     | 공통 컴포넌트 재사용성                               |
| Firebase              | Social Login 구현                                    |
| Socket.io-client      | 멀티플레이를 위한 실시간 통신                        |
| Pusher-js             | 실시간 DB 변화 구독                                  |
| Jest                  | React Component Test                                 |
| Enzyme                | React Component Test                                 |
| React-testing-library | TBD                                                  |
| Redux-logger          | TBD                                                  |

  <br>
  </div>
</details>

<details>
  <summary><span style="font-size: 16px; font-weight: 600">Back End<span> </summary>
  <div markdown="1">

| Stack                | Remarks                       |
| :------------------- | :---------------------------- |
| NodeJS               | JavaScript Runtime으로 npm    |
| Express              | JavaScript 서버 애플리케이션  |
| MongoDB              | MERN-STACK 기반 구현          |
| Mongoose             | MongoDB JavaScript ODM        |
| JWT (JSON Web Token) | 토큰 기반 인증                |
| Soket.io             | 멀티플레이를 위한 실시간 통신 |
| Pusher               | 실시간 DB 변화 알림           |
| Mocha                | 서버 엔드포인트 테스트        |
| supertest            | 서버 엔드포인트 테스트        |
| AWS                  | TBD                           |

  <br>
  </div>
</details>

<br>

## Feature

### **`Game Platform`**

1. **두 가지 방식의 유저 인증 구현 (구글 로그인 / 비회원 로그인)**

- 구글 로그인 (firebase + jwt)
  - 사용자 게임 기록이 DB에 저장
  - jwt 토큰방식 인증으로 스스로 로그아웃 하기 전에는 12시간 동안 인증 상태가 유지
- 비회원 로그인
  - 랜덤한 Player Name 부여하여 모든 게임 정상적으로 이용 가능
  - DB에 저장된 비회원 정보는 매시 정각에 정리

2. **유저 행동을 고려한 동작 설계 및 에러 핸들링**

- 방장 퇴장 시 방 삭제 기능
  - 같은 방에 있던 다른 유저들은 대기 화면으로 이동
- 유저 입/퇴장 상태 인식하여 방 상태 변경
  - Full 상태의 방에 입장 불가
- 방 랜덤 입장 기능
- 마이크 비허용 시 허용 안내 메세지
- BGM ON/OFF 기능
- 방별로 번호 부여하여 친구끼리 같은 방에 입장할 수 있도록 편의 제공

### **`Little Forest`**

### **`Monster Escape`**

### **`Energy Battle`**

1. **두 유저간 Volume 입력 크기를 통해 승패 결정**

- Volume은 누적값으로 계산

2. **대기 상태 추가하여 멀티플레이 오작동 방지**

- 양 쪽 사용자가 모두 입장한 뒤 Manual Modal이 모두 닫혔을 떄 대기 상태 해제

3. **게임 시작 시 시작버튼 비활성화**

- 의도적인 오작동 방지

4. **게임 결과에 따른 유저 승리 기록 실시간 반영**

<br>

## Challenge

### **`Volume Meter`**

미니 게임 Monster Escape와 Energy Effect는 소리 크기를 게임 입력으로 받아, 게임 내 캐릭터를 조작합니다. 이전에 음성인식을 해주는 Web Speech API 사용했던 경험이 있었기에, 볼륨 측정 또한 Web API에 있을 것이라 판단하였습니다. 하지만 기대와 달리 Web API는 마이크 데이터만 센싱할 뿐 별도의 볼륨 측정 기능은 없었기에 게임 주제를 바꾸어야하나 고민하였습니다. 하지만 Web API가 Audio Context 객체를 통해 마이크 입력을 FFT로 계측해주기 때문에, 이를 프로세싱하여 볼륨 측정 함수를 만들기로 하였습니다. FFT(Fast Fourier Transformation)란 시간영역의 디지털 신호를 주파수 영역에서 분석하는 기법입니다. 따라서 <span style="color: blue">FFT를 통해 마이크에 들어온 플레이어의 목소리를 주파수별 크기로 분해하고 이들을 가공하여 볼륨을 구할 수 있었습니다.</span> 처음에는 개념이 낯설어 프로젝트를 진행하는데 어려웠지만, 프로그래밍을 통해 다양한 분야를 접하고 더나아가 구현할 수 있었던 점이 흥미로웠습니다.

### **`Pitch Detector`**

**Audio Context (Web Api)**  
음성인식을 위해 Web Api로 제공되는 Audio Context를 사용하였습니다.
다만, Audio Context의 AnalyserNode를 통해 얻을 수 있는 주파수 데이터가 FFT로 변환되어 제공되는데 이를 원하는 형태로 가공하여 사용하는 것에 어려움이 있어 MIT의 Pitch Detector의 Source Code를 가공하여 사용하였습니다.

### **`Canvas`**

게임 플레이 화면을 보여주기 위해, Javascript를 기반으로 HTML에 다양한 애니메이션을 보여줄 수 있는 Canvas를 사용하였습니다. 원하는 선/도형/이미지를 그리고, 애니메이션 효과를 넣기 위해 requestAnimationFrame함수를 재귀로 실행하는 등 Canvas 개념 자체는 어렵지 않았습니다. 하지만 게임 특성 상 아래와 같이 다양한 상황(점프 & 낙하 / 횡이동 & 종이동 / 충돌 & 접촉 / 캐릭터 사망 등)이 있었기에, 이들을 고려하여 어떻게 Canvas에 그릴지 로직을 만드는 것에 어려움이 있었습니다.

- 생동감 있는 게임 캐릭터 구현을 위해 Sprite 이미지를 사용하였기 때문에, 기본 60fps로 실행되는 requestAnimationFrame 함수에서 이미지 프레임에 맞게 Canvas Drawing이 실행되도록 <span style="color: blue">프레임 제어 로직</span>이 필요했습니다.
- 캐릭터가 점프를 했을 때 아래와 같은 과정을 거치기 때문에, Canvas Y 축(수직 축)에 대해 동역학 모델링에서 사용되는 <span style="color: blue">중력모델</span>을 구현해야 했습니다.
  ```
  점프 → 빠르게 올라감 → 점점 느려짐 → 멈춤 → 느리게 떨어짐 → 점점 빨라짐 → 착지
  ```
- 지면 접촉 및 장애물 충돌 구현을 위해 캐릭터 좌표(x, y)와 지면 및 장애물 좌표를 다앙햔 경우를 고려하여 로직을 만들어야 했습니다.
- 멀티플레이를 할 경우, 플레이어마다 브라우저 화면의 크기가 다르기 때문에 소켓통신에 절대좌표를 보내면 캐릭터가 이상한 위치에 그려지게 됩니다. 따라서 캐릭터 위치를 Canvas 크기에 대해 정규화하여 소켓통신을 해야했습니다.

이처럼 Canvas를 다루는게 까다롭고 어려웠지만, 게임, 웹 디자인 등에 쓰이는 Canvas의 활용도에 대해 배울 수 있었던 좋은 경험이었습니다.

### **`Socket IO`**

Voice Game에서 socket 통신이 필요한 부분은 아래와 같습니다.

1. 방 입퇴장 관련 통신 (join-room, leave-room)
2. 게임 중 유저 정보 통신 (start-game, player-input)

대부분의 동작은 수월하게 구현했으나, `disconnect`를 조작하는 과정에서 어려움이 있었습니다. 유저가 의도적으로 방을 나간 경우에는 `useEffect`에서 이벤트를 emit하여 핸들링할 수 있으나 새로고침, 인터넷 연결 종료 등의 특정 상황에서는 socket에 기본적으로 내장되어있는 `disconnect` 이벤트가 자동으로 실행되기 때문에 콜백함수에 인자를 전달하기 어렵기 때문입니다.

인자를 전달하는 것이 중요했던 이유는, '누가 나갔는지'에 대한 정보가 필요했기 때문입니다. 단지 socket에서 누군가 `disconnect`되었다는 사실은 그 상태로도 확인할 수 있었으나 '방장'이 나갈 경우에는 특정한 동작을 수행할 필요가 있었습니다.

인자 전달 없이도 `disconnect` 동작을 올바르게 작동하도록 하기 위해서는 socket 내부 기능에 대한 보다 깊은 이해가 필요했습니다. 상세한 해결 절차는 아래와 같습니다.

[방장이 나간 사실을 어떻게 감지할까? - socket.io](https://www.notion.so/canwefly89/disconnect-leave-socket-io-950fbef3ed9a4c789f4e850af2dad3e7)

### **`객체 지향 프로그램`**

...

### **`움직이는 이미지 만들기`**

프로젝트의 첫번째 목표는 역량 강화였지만, 그만큼 중요했던 두번째 목표는 플레이어가 재미를 느낄 수 있는 게임다운 게임을 만들자는 것이었습니다. 그래서 유저에게 보여지는 즐거움을 극대화하고, 현재 게임이 잘 동작하고 있다는 정보를 전달하기 위해 움직이는 캐릭터와 효과를 주고자 하였습니다.

화면에 움직이는 요소를 구현하기 위해 gif나 svg를 활용할 수도 있었지만, 캔버스의 frame 기능을 최대한 활용하고 로딩 시간을 단축시키기 위해 sprite image를 도입했습니다.

### **`이미지 저장 위치`**

게임을 구현하고 나니 배경화면, 캐릭터, 이펙트 등 코드를 제외한 asset들이 쌓이게 되었고, 어디에 이미지를 저장할 것인가가 프로젝트 후반의 주요한 화두 중 하나였습니다.  
저희는 아래와 같은 검토 과정을 거쳐 최종적으로 source 내부에 이미지를 저장하기로 하였습니다.  
[이미지를 어디에 저장할까?](https://www.notion.so/canwefly89/AWS-S3-download-files-import-from-public-in-react-8eb1c34ddc0949b5b0d61af055e3aea4)

1. S3에 저장하기  
   파일별로 경로를 지정해서 불러와야만 하기 때문에 image의 수가 많은 본 프로젝트에 도입하기에는 부적합하다고 판단
2. public 폴더에 저장하기  
   Create-React-App에서는 public으로부터 `import`를 실행하기 위해서는 `webpack.config.js`를 조작해야 함  
   `webpack.config.js`를 조작하기 위해 컴파일러와 번들러를 `eject`하는 방식을 고려하였으나, 다른 코드에서 생길 문제들을 예상할 수 없어 source에 두기로 결정

### **`Custom Hook`**

...

<br>

## History

영상으로 넣는다면 주차별로 구분하지 않아도 괜찮을 것 같습니다.

<br>

## Conclusion

### **`서성주`**

인생에서 가장 알찼던 3주였습니다. 이미 보유하고 있던 기술 스택은 더 깊게 이해하게 되었고, 새로운 기술들도 많이 배웠습니다. 게임은 객체 지향적으로, 컴포넌트는 함수형으로 구현하며 두 가지 방식에 대한 이해도를 높였습니다.

또한 팀원들에게 학습하는 방식과 태도 등에서 배울점을 많이 발견하여 기술 외적으로도 발전할 수 있었습니다.

### **`권민호`**

권민호의 마무리 멘트

### **`김재덕`**

캔버스 로직이 vanilla javascript로 되어 있고 각각의 요소들이 독립적이어야 했기 때문에 평소보다 OOP에 더 신경을 써야 했습니다. 어려움도 많이 느꼈지만 OOP의 확실한 장점을 전보다 더 체감할 수 있는 계기가 되었습니다.

<br>

## Contact

### **`서성주`** canwefly89@gmail.com

### **`권민호`** minhob38@gmail.com

### **`김재덕`** jdcoder9@gmail.com
