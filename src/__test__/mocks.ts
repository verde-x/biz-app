export const defaultUserData = {
  user_id: "test",
  name: "テストユーザー",
  description: "テスト説明",
  github_id: "testgithub",
  qiita_id: "testqiita",
  x_id: "testx",
};

export const defaultSkillData = {
  id: 1,
  name: "React",
};

export const mockUser = (overrides = {}) => ({
  userData: defaultUserData,
  loading: false,
  error: null,
  ...overrides,
});

export const mockSkill = (overrides = {}) => ({
  skill: defaultSkillData,
  loading: false,
  error: null,
  ...overrides,
});
