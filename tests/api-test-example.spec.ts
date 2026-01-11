import { test, expect } from '../utilities/APITestUtils'; 

test.describe('API User Story Example @user2', () => {

  test('Test case01', async ({ apiContext }) => {
    const response = await apiContext.get('/endpoint'); // Replace '/endpoint' with your actual API endpoint
    
    expect(response.status()).toBe(200);
    
  });

  test('Test case02', async ({ apiContext }) => {
    
    const response = await apiContext.post('/endpoint', { // Replace '/endpoint' with your actual API endpoint
      data: {
        // your request body
      },
    });

    expect(response.status()).toBe(201);
    
  });


  test('Test case03', async ({ apiContext }) => {
    
    const response = await apiContext.put('/endpoint', { // Replace '/endpoint' with your actual API endpoint
      data: {
        // your request body
      },
    });
    expect(response.status()).toBe(200);
  
  });


  test('Test case04', async ({ apiContext }) => {
    
    const response = await apiContext.delete('/endpoint', { // Replace '/endpoint' with your actual API endpoint
      data: {
        // your request body
      },
    });
    expect(response.status()).toBe(204);
  
  });

});