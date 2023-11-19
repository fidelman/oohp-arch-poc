module.exports = {
  thinkEasy: {
    input: "https://frontend-test-be.stage.thinkeasy.cz/api-json",
    output: {
      target: `./src/Core/OpenApi/Methods.ts`,
      prettier: true,
      client: "axios",
      mode: "split",
      override: {
        mutator: {
          path: "./src/Core/OpenApi/Mutator.ts",
          name: "clientInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
};
