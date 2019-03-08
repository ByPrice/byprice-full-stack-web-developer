
describe('Home', function () {
  it('Should return 200', async function () {
    await this.agent
      .get('/')
      .expect(200)
  })
})
