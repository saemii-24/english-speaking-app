module.exports = {
  types: [
    { value: "feat", name: "feat: ✨ 새로운 기능 추가" },
    { value: "fix", name: "fix: 🐛 버그 수정" },
    { value: "docs", name: "docs: 📝 문서 수정" },
    { value: "design", name: "design: 💄 UI / 디자인 변경 (기능 변화 없음)" },
    { value: "style", name: "style: 🎨 코드 스타일 변경 (포맷팅 등)" },
    { value: "refactor", name: "refactor: 🔨 리팩토링" },
    { value: "chore", name: "chore: 🔧 설정 / 기타 작업" },
  ],

  scopes: [
    { name: "frontend" },
    { name: "backend" },
    { name: "infra" },
    { name: "db" },
    { name: "whisper" },
    { name: "docs" },
    { name: "config" },
  ],

  messages: {
    type: "변경 유형을 선택하세요:",
    scope: "작업 영역을 선택하세요:",
    subject: "변경 내용을 간단히 작성하세요:",
    confirmCommit: "이 커밋을 진행하시겠습니까?",
  },
};
