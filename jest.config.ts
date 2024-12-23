
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
   testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: false,
};

// export default {
//   clearMocks: true,
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };