const nextJest = require("next/jest");

// next/jest를 사용하여 Next.js의 설정을 가져옵니다
const createJestConfig = nextJest({
  // next.config.js와 .env 파일이 있는 위치를 지정합니다
  dir: "./",
});

// Jest에 적용할 커스텀 설정
const customJestConfig = {
  // 테스트 환경으로 jsdom을 사용합니다
  testEnvironment: "jest-environment-jsdom",
  // 테스트 파일의 위치를 지정합니다
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  // 테스트에서 모듈을 찾을 때 사용할 경로 별칭을 설정합니다
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // 테스트 실행 전에 실행할 설정 파일을 지정합니다
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // 테스트 커버리지 설정
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/_*.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
  ],
};

// createJestConfig를 내보내 Next.js가 테스트 설정을 인식하도록 합니다
module.exports = createJestConfig(customJestConfig);
