import { test as base } from "@playwright/test";

export const test = base.extend<{ testHook: void }>({
  testHook: [
    async ({}, use) => {
      const startTime = new Date();
      console.log(`Test start time: ${startTime}`);

      await use();

      const endTime = new Date();
      console.log(`Test end time: ${endTime}`);
      const duration = Math.abs(endTime.getTime() - startTime.getTime());
      console.log(`Test duration: ${duration} ms`);
    },
    { auto: true },
  ],
});

export { expect } from "@playwright/test";