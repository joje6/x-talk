# x-talk

## 사전작업

### x-talk-server 설치 및 실행
- [x-talk-server 설치 및 실행 방법](https://github.com/joje6/x-talk-server)

## 설치
```sh
$ git clone https://github.com/joje6/x-talk.git
$ cd x-talk
$ npm i && npm i github:joje6/x-talk-connect
```

## 실행

### 개발모드
> `http://localhost:9000`

```sh
$ npm run dev
```

### 프러덕션모드
> `http://localhost:9000`

```sh
$ npm run dist:web
$ npm start
```

### 스토리북
> `http://localhost:9001`
 
```sh
$ npm run storybook
```


## 빌드

### 라이브러리 빌드
> 일반적인 사용방식(script/link 태그를 사용)을 지원하기 위해 단일 js 와 css 로 빌드합니다. 빌드 경로 : `dist`

```sh
$ npm run dist
```

### 웹애플리케이션 빌드
> 브라우저로 실행 가능한 웹애플리케이션 모드로 빌드합니다. 빌드경로 `docs`

```sh
$ npm run dist:web
```

### 바벨(watch)
> 다른 패키지에서 npm link 로 참조 사용시 babel 빌드를 watch 모드로 실행시킬 수 있습니다. 빌드경로 : `lib`

```sh
$ npm run watch
```


### 스토리북
> 스토리북을 빌드합니다. 설정경로 : `.storybook`, 빌드경로 : `storybook`

```sh
$ npm run dist:storybook
```

## 테스트
> 카르마 테스트를 실행합니다. 테스트 결과 리포트 경로 : `.test/components`

```sh
$ npm test
```
