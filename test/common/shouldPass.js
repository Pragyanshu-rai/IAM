export default (res, message=true) => {

  test('should have the status code as "200" or "201"', () => { 
    expect(res.status).toBe(200 || 201);
  });

  if (message) {
    test('should have the message containing "success"', () => { 
      expect(res.body.message).toMatch(/.*success.*/gi);
    });
  }
};