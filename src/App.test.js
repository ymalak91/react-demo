import React from "react";
import { render, screen } from "@testing-library/react";

import NotFoundPage from "./views/NotFoundPage/NotFoundPage";
import { checkAPIStatus, fetchData } from "./controlers/uat-helpers";

const url =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";


// Check Network connection 
test("Check network connection", () => {
  const isOnline = navigator.onLine;
  expect(isOnline).toBe(true);
});


// Make sure that the response header is 200
test("Check response status", async () => {
  let ResponseStatus = 0;
  ResponseStatus = await checkAPIStatus(url);
  expect(ResponseStatus).toBe(200);
});

// Check that the endpoint returns Data in the response
test("check Data retrieval", async () => {
  // Call the fetchData function and check the response
  const data = await fetchData(url);
  // checking the data
  expect(data).toBeDefined();
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});

// Check Page not found page is rendered.
it("Check Page not found Render", () => {
  render(<NotFoundPage />);
  expect(screen.getByText("404 Page")).toBeInTheDocument();
});

// Remove ReactDOMTestUtils.act error from console for testing compatability
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (!message.includes("ReactDOMTestUtils.act")) {
      console.error(message);
    }
  });
});

afterAll(() => {
  console.error.mockRestore();
});
