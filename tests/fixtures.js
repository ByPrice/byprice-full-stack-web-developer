describe('Home', () => {
  it('Should return 200', async () => {
    await this.agent.get('/').expect(200);
  });
});
