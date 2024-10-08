import { test, expect, request } from '@playwright/test';

// Define client credentials
const clientId = "7e29e2facf83359855f746fc490443e6";
const clientSecret = "e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb";

// Define Endpoints URLs
const tokenUrl = 'https://sandbox-partners-api.airalo.com/v2/token'; 
const orderUrl = 'https://sandbox-partners-api.airalo.com/v2/orders-async';
const getOrderListUrl = 'https://sandbox-partners-api.airalo.com/v2/orders';

// Obtain OAuth2 tokens to access the Airalo Partner API
test.describe('OAuth2 Token API Test', () => {
  async function getAuthToken(apiRequest) {
    const response = await apiRequest.post(tokenUrl, {
      headers: {
        'Accept': 'application/json'
      },
      form: {
        'client_id': clientId,
        'client_secret': clientSecret,
        'grant_type': 'client_credentials'
      }
    });

    // Verify the response code of OAuth2 token request
    expect(response.status()).toBe(200);

    // Parse the response as JSON
    const responseBody = await response.json();

    // Assert that a valid token is returned and is a string    
    expect(responseBody.data.access_token).toBeDefined();
    let accessToken = responseBody.data.access_token;
    return responseBody.data.access_token;
  }


  // Make Submit order request with valid OAuth2 token
  test('Make Submit order request with valid OAuth2 token', async () => {

  // Create a new API request context
  const postOrderApiRequest = await request.newContext();
  
   // Fetch a valid OAuth2 token
   const authToken = await getAuthToken(postOrderApiRequest);

  // Make the POST request with the required headers, request url and form data
  const orderResponse = await postOrderApiRequest.post(orderUrl, {
   
     headers: {
     'Authorization': `Bearer ${authToken}`,
     'Accept': 'application/json'
    },
    form: {
      "quantity": '6',
      "package_id": "merhaba-7days-1gb",
      "type": "sim",// type: eSIMs is not the accepted data form hence using type:sim
      "description": "6 merhaba-7days-1gb sim",
      "webhook_url": "https://your-webhook.com"
      
   }
  });
      
      // Verify the response code of Submit order request
      expect(orderResponse.status()).toBe(202);

      // Parse the response as JSON
      const orderResponseBody = await orderResponse.json();

       // Assert that the orders are successfully submitted
    expect(orderResponseBody).toBeDefined();
    expect(orderResponseBody.meta.message).toBe("success");    

  });

  //Get order list with valid OAuth2 token
  test('Get order list with valid OAuth2 token', async () => {

    // Create a new API request context
    const oderListApiRequest = await request.newContext();

    // Fetch a valid OAuth2 token
    const authToken = await getAuthToken(oderListApiRequest);

    // Make the GET request with the required headers and request url
    const orderResponse = await oderListApiRequest.get(getOrderListUrl, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });

    // Verify the response code of Get order list request
    expect(orderResponse.status()).toBe(200);

    // Parse the response as JSON
    const orderResponseBody = await orderResponse.json();

    // Verify the order details in the Get order list response body and fetch the 6 sims having specific package_id
    if ((Array.isArray(orderResponseBody.data))) {
      const simOrder = orderResponseBody.data.find(element => element.package_id == "merhaba-7days-1gb")
      expect(simOrder).toBeDefined();
      expect(simOrder.quantity).toBe(6)
    }
  });
});
