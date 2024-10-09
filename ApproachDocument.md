# Why Playwright?
Playwright is a powerful, open-source testing and automation framework developed by Microsoft. It is widely used for end-to-end testing of web applications. The key advantages of using Playwright are:
1. Cross-browser Automation
2. Cross-platform testing
3. API Testing and network Interception
4. Automation Waiting and Parallel execution
5. Mutiple language support


## UI Autiomation Test

### Objective
The purpose of this test is to verify the eSIM purchase flow for Japan on the Airalo website using Playwright. The test ensures that the user can successfully search for the eSIM for Japan, select a package, and validate package details such as operator name, coverage, data amount, validity, and price.

### Assumptions & Dependencies:
The page's DOM structure and the **data-testid** attributes are consistent across all tests.
The website's response times allow for the waits defined (e.g., page.waitForTimeout(2000)).
Currency may vary, and tests should account for differences in currency (e.g., € vs $).
The first eSIM package for Japan always appears at the top of the search results under Local segment.

### Test Scenario: eSIM Purchase Flow for Japan
1. Launch Airalo Website:
- Open the Airalo homepage (https://www.airalo.com).

2. Search for Japan:
- Input "Japan" into the search bar.
- Wait for the autocomplete to display search results.

3. Select Japan from the Autocomplete List:
- Select the first option from the autocomplete list that corresponds to Japan.

4. Select an eSIM Package:
- Identify and click the "Buy Now" button on the first eSIM package available under Japan.

5. Verify eSIM Package Details: Validate the eSIM package details, including:
 - Operator name (Moshi Moshi).
 - Coverage region (Japan).
 - Data provided (1 GB).
 - Validity period (7 Days).
 - Price (4.50 €).

## API Automaiton Test

### Objective

The purpose of this test is automating API tests using Playwright for OAuth2 token authentication and API requests on the Airalo Partner API. Playwright is chosen due to its robust and flexible support for handling API calls in addition to its primary use for web-based UI testing. The biggest highlight to use Playwright is it allows combining UI testing and API testing in a single framework, which can be beneficial when testing both frontend and backend flows simultaneously.

### Assumptions

- Stable API Environment: It is assumed that the sandbox environment provided by Airalo API is stable, responsive, and mirrors the production environment to a reasonable degree.
- Correct API Permissions: The API client credentials provided have the correct permissions to generate tokens, submit orders, and get order lists.
- Accurate Response Time: The responses from the API, especially the /orders-async endpoint, are timely enough for automated testing and do not result in unexpected delays.

### Test Scenario: Authenticate, Submit and Get order

1. Token Generation:
- Automate the generation of OAuth2 tokens by making a POST request to the /token endpoint.
- Validate the response status and ensure that a valid token is returned.
- Token generation logic is reusable across multiple tests requiring authorization

2. Order Submission:
- Using the valid token, make a POST request to the /orders-async endpoint.
- Validate that the response status is **202 Accepted**, indicating the order submission is processed.
- Assert that the response message indicates a successful order.

3. Get Order List:
- With the valid token, make a GET request to the /orders endpoint to retrieve the list of orders.
- Validate that the correct number of orders, specifically those matching a given package_id, are present in the response.

4. Test Validation:
- For each test, validate the status codes, response bodies, and ensure that expected values such as access_token, quantity, and package_id match the test data.
