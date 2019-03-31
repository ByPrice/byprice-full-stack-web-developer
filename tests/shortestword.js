
describe('Shortest world', function () {
  it('Should return `4` as a shortest world length in the list', async function () {
    await this.agent
      .post('/api/shortestword')
      .send({ list: ['Sirio', 'Canopus', 'Aldebarán', 'Antares', 'Damn'] })
      .set('Accept', 'application/json')
      .expect(200, {
        shortestLength: 4
      })
  })
  it('Should get 400 with error message `List max length allowed 8`', async function () {
    await this.agent
      .post('/api/shortestword')
      .send({ list: ['Sirio', 'Canopus', 'Aldebarán', 'Antares', 'Damn', 'Altair', 'Algol', 'Aldebarán', 'Merak'] })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'List max length allowed 8'
      })
  })
  it('Should get 400 with error message `List min length allowed 2`', async function () {
    await this.agent
      .post('/api/shortestword')
      .send({ list: ['a'] })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'List min length allowed 2'
      })
  })
  it('Should get 400 with error message `List should be an Array`', async function () {
    await this.agent
      .post('/api/shortestword')
      .send({ list: 'Sirio, Canopus, Aldebarán, Antares, damn, Altair, Algol, Aldebarán, Merak' })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'List should be an Array'
      })
  })
})
