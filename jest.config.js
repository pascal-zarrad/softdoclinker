module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
    collectCoverageFrom: ["src/**/*.{js,ts,vue}"],
    setupFiles: ["./tests/jestReflectMetadata.ts"]
};
