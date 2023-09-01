# `Wanted-Pre-Onboarding - 특정 Github Repo의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축`

Facebook의 React 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹 사이트 구축

* Assignment1
  - 이슈 목록 화면
  - 이슈 목록 가져오기 API 활용
  - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
  - 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
  - 다섯번째 셀마다 광고 이미지 출력
  - 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

* Assignment2
  - 이슈 상세 화면
  - 이슈의 상세 내용 표시
  - ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
    
* Assignment3
  - 공통 헤더 (두 페이지는 공통 헤더를 공유합니다.)
  - 헤더에는 Organization Name / Repository Name이 표시됩니다. 


## `프로젝트 실행 방법`

```bash
git clone https://github.com/patataco/wanted-pre-onboarding-frontend.git](https://github.com/patataco/github-issues-tracker.git
npm install
npm run dev
```

## 데모 영상

Vercel을 통해 배포. [DEMO](https://github-issues-tracker-lemon.vercel.app)

- 이슈 목록
    
  ![CleanShot 2023-09-01 at 23 36 08](https://github.com/patataco/github-issues-tracker/assets/127014105/820f8d91-873a-4690-b4f2-3904d4b1445c)

- 이슈 상세페이지
  
  ![CleanShot 2023-09-01 at 23 37 50](https://github.com/patataco/github-issues-tracker/assets/127014105/6a462003-7f73-446e-b038-7400e8b6e194)

- 에러 처리
  
  ![CleanShot 2023-09-01 at 23 38 35](https://github.com/patataco/github-issues-tracker/assets/127014105/4f353c34-dd34-4f0d-8afb-9c0fea2286dd)

## `language & libraries`

* Typescript
* Next.js
* Tailwind CSS
* Octokit
* react-markdown
  

## `구조`

```
src
 ┣ api
 ┃ ┗ octokit.ts
 ┣ components
 ┃ ┣ AD.tsx
 ┃ ┣ Error.tsx
 ┃ ┣ ErrorBoundary.tsx
 ┃ ┣ Header.tsx
 ┃ ┣ IssueDetails.tsx
 ┃ ┣ IssueItem.tsx
 ┃ ┣ IssueList.tsx
 ┃ ┣ Layout.tsx
 ┃ ┗ LoadingSpinner.tsx
 ┣ context
 ┃ ┣ IssueListProvider.tsx
 ┃ ┗ IssueProvider.tsx
 ┣ fetcher
 ┃ ┣ IssueFetcher.tsx
 ┃ ┗ IssueListFetcher.tsx
 ┣ pages
 ┃ ┣ api
 ┃ ┃ ┗ hello.ts
 ┃ ┣ issue
 ┃ ┃ ┗ [id].tsx
 ┃ ┣ 404.tsx
 ┃ ┣ _app.tsx
 ┃ ┣ _document.tsx
 ┃ ┗ index.tsx
 ┣ styles
 ┃ ┣ globals.css
 ┃ ┗ markdown.css
 ┗ utils
 ┃ ┗ index.ts

```


### 설계 및 주요 동작 설명

* `API`
  * GitHub에서 제공하는 octokit을 사용했습니다.
  * octokit.ts에서 API를 모듈화하여 관심사를 분리하였습니다.
    
* `무한 스크롤`
  * `Intersection Observer API`를 사용하여 무한 스크롤을 구현하여 사용자가 원활한 스크롤 경험을 유지할 수 있도록 했습니다.
  * Context Api를 사용하여 비즈니스 로직을 캡슐화하였습니다.

* `Loading 처리`
  * 로딩 상태를 처리하기 위해 fetcher라는 상위 컴포넌트를 만들어 UI컴포넌트를 감싸고 그곳에서 isLoading 값을 관리하였습 
    니다.
  * isLoading 값이 true일 경우 Loading 중임을 나타내는 spinner 컴포넌트를 렌더링하고, false가 되면 해당 하위 컴포 
    넌트가 렌더링되도록 구현하였습니다.

 * `Error 처리`
    * 에러 처리를 위해 ErrorBoundary를 구현하였습니다.
    * 비동기에서 터지는 error는 ErrorBoundary에서 catch 될 수 없기 때문에 Error 상태를 boolean값으로 관리하는 상태를
      만들고 이슈 목록 및 상세 페이지에서 데이터 fetching 중 에러가 발생하면 Error 상태값을 true로 변경하였습니다.
    * 또한 Error 상태가 true일 경우 render 과정에서 error가 throw 되도록 만들어 Errorboundary로 에러를 전달하였습 
    니다. 




