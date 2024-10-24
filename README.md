# Module Federation Playground

module federation에 관련한 실험들을 위한 모노레포 by. [@minr2kb](https://github.com/minr2kb)

## 시작하기

### Install

```bash
$ yarn
```

### Development

```bash
# remote&host앱 통합 실행
$ yarn dev

# host앱만 실행
$ yarn dev:host

# remote앱 전체 preview 실행
$ yarn preview:remote
```

### Deploy

WIP

## 스택

- 패키지 매니져: Yarn Berry (4.5.0)
- 호스트: React18 + Vite / NEXT
- 리모트: React18 + Vite / Next / WIP
- UI: TBD

## Module Federation을 이용한 MFA

### 도입 고려 시기

- 하나의 프로젝트에서 관리하기에 너무 커지는 프로젝트
- 자율절/독립적인 팀의 배포주기
- 각각의 도메인이 명확하게 분리 가능할 때
- 소스코드의 복잡도가 개발팀이 수용할 수 있는 한계에서 벗어날 때

### 장점

- 코드의 복잡도 해소
- 각 앱 별 프로젝트 환경의 다양화
- 모듈 장애 격리 가능
- 하나의 앱 내의 통일된 경험 → 레이아웃 등 공통 모듈의 통합

### 단점

- 운영, 프로젝트 세팅의 복잡성
- 단일 팀에 의해 유지될정도의 작은 서비스의 경우에는 오버엔지니어링이 될 수 있음
- 사용하는 라이브러리 버전 파편화
- 새로운 서비스 구축에 큰 비용
- 보안 관리의 복잡성

## 고민점들

### Host앱의 스펙은?

- 대부분 레이아웃을 담당할 것으로 여겨짐
- 인증, 라우팅 등 핵심 로직 담당
- window간의 dispatch 이벤트를 통한 커스텀 통신 시스템 구축 필요
- SEO 관련 세팅도 담당하게 될 듯
- 각 모듈 로드에 대한 에러 바운더리

### 성능 측면에서 pros&cons?

- 모듈 쉐어링으로 중복 감소
- lazy load로 초기 로드 속도 개선 가능
- 네트워크 요청 증가
- CDN 캐싱 전략의 필요성

### [CANCEL] Next 프로젝트에 도입시키려면? SSR 충분히 사용 가능한가?

- SSR의 이점은 있지만, 살리기 위해서는 remote모듈도 SSR을 지원해야만 한다. → 동일한 Next로 구현해야 할 수 있음
- remote 설계에 제한이 생기므로 완전 독립적 모델로 구현하기는 한계가 있다
- SSR호환성에 대한 host 측에서 동적인 구별이 사실상 불가능하여 csr만 사용할 가능성이 높다.
- 따라서 NextJS로 하드하게 설계된 프로젝트가 아닌 이상, BFF와 React로 분리시키는게 효율적으로 보인다.
- 보통 기존 모놀리식 구조를 마이그레이션한 사례가 많음 -> Next 프로젝트를 쪼개다 보니 remote도 다 next 동일 환경에서 하는 케이스가 많음. remote를 react로 해도 webpack 환경이 필수적으로 보임.

### [CANCEL] 디자인시스템을 remote로 제공한다면?

- 모든 프로젝트에 실시간 업데이트되어 큰 일관성을 주지 않을까?
- 의존성 관리도 최소화 시킬 수 있을 것으로 보임
- 근데 일단 모듈 로드시에 네트워크 지연으로 성능 저하가 일어날 수 있다.
- 수많은 모듈과의 호환성 관리를 위해 테스팅 + 디버깅 비용이 많이 들어간다.
- 모듈의 버젼관리가 힘들어진다.
- 일단 serve를 해야 하므로 추가적인 비용이 들어간다
- 결론) 초기 로드 속도를 너무 늦출 뿐더러 안정성 이슈로 반려

### [DONE] queryClient를 어떻게 공유해야할까?

- 각 모듈마다 provider를 제공한다.
- 모듈별 client 인스턴스를 따로 생성한다 -> 모듈별 쿼리 공유가 안됨..!
- 외부에서 클라이언트 주입은? -> host에서 각 서비스 별 client 인스턴스를 만들고, prop으로 넣어주자! -> 구현은 했는데, 작동이 되는지는 확인 필요
- 내부 provider는... HOC를 통해 씌우자

### Webpack vs. Vite

- WIP

### [WIP] Remote 주소를 동적으로 변경시키려면?

- WIP

### [DONE] 타입 자동화는 어떤 방식으로 구현 가능한가

- 내부의 share package를 참조 -> 외부의 package 타입 참조시 내부적인 external package들의 참조가 달라 private 문제가 생김
- 직접 스크립트를 통해 host에 주입시키자 -> expose에 기반해서 inline module declaration을 추출해서 d.ts파일로 만든 후 host에 넣어주기
- 아니면 tsconfig에 path로 직접 넣어주는건? -> 이거도 외부 패키지 참조 private 에러로 불가
- 어차피 타입 정보는 개발단의 정적 정보로서만 의미가 있기에 빡센 관리가 필요없음 / 로컬에서 host 실행을 위해서는 build 필수
- type-build-util 이라는 개별 패키지 제작해서 host로 직접 넣어주는 방식 채택

## TO-DO

- type-build-util에 watch모드..?
- host앱 에러바운더리 처리
- 커스텀 이벤트 버스 제작
- 동적 remote 주소 구현
- 모노레포 pnpm nx or turbo 기반으로 옮겨보자.
