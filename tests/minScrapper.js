
const assert = require('assert')

describe('Mini scrapper', function () {

  it('Should return formatted items from urls', async function () {
    let urls = ['https://articulo.mercadolibre.com.mx/MLM-606237538-celular-apple-iphone-6-64gb-4g-lte-_JM', 'https://www.amazon.com.mx/Apple-Desbloqueado-Unlocked-Reacondicionado-Refurbished/dp/B076JKVKD4', 'https://byprice.com/producto/1d5f0b32-6eca-4cba-bdaa-8e319710d6dd/iphone-xs-64gb-plata']
    let response = await this.agent
      .post('/api/mini-scrapper')
      .send({ urls })
      .set('Accept', 'application/json')
      .expect(200)
    let items = response.body
    let i = 0
    assert(Array.isArray(items))
    for (let it of items) {
      assert(it.name)
      assert.equal(it.url, urls[i])
      assert(typeof it.name === 'string')
      assert(!isNaN(it.price))
      assert(it.price)
      i++
    }
  })

  it('Should return 400 with `Some value in URL is not allowed` message', async function () {
    await this.agent
      .post('/api/mini-scrapper')
      .send({ urls: ['https://google.com', 'https://www.amazon.com.mx/Apple-Desbloqueado-Unlocked-Reacondicionado-Refurbished/dp/B076JKVKD4', 'https://byprice.com/producto/1d5f0b32-6eca-4cba-bdaa-8e319710d6dd/iphone-xs-64gb-plata'] })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'Some value in URL is not allowed`'
      })
  })

  it('Should return formatted item from url from Amazon', async function () {
    let url = 'https://www.amazon.com.mx/Apple-Desbloqueado-Unlocked-Reacondicionado-Refurbished/dp/B076JKVKD4'
    let response = await this.agent
      .post('/api/mini-scrapper')
      .send({ urls: [url] })
      .set('Accept', 'application/json')
      .expect(400)
    let item = response.body
    assert.equal(typeof item, 'object')
    assert.equal(item.url, url)
  })

  it('Should return formatted item from url from MercadoLibre', async function () {
    let url = 'https://articulo.mercadolibre.com.mx/MLM-606237538-celular-apple-iphone-6-64gb-4g-lte-_JM'
    let response = await this.agent
      .post('/api/mini-scrapper')
      .send({ urls: [url] })
      .set('Accept', 'application/json')
      .expect(400)
    let item = response.body
    assert.equal(typeof item, 'object')
    assert.equal(item.url, url)
  })

  it('Should return formatted item from url from ByPrice', async function () {
    let url = 'https://byprice.com/producto/1d5f0b32-6eca-4cba-bdaa-8e319710d6dd/iphone-xs-64gb-plata'
    let response = await this.agent
      .post('/api/mini-scrapper')
      .send({ urls: [url] })
      .set('Accept', 'application/json')
      .expect(400)
    let item = response.body
    assert.equal(typeof item, 'object')
    assert.equal(item.url, url)
  })

  it('Should return 400 with `Some value in URL is not allowed` message', async function () {
    await this.agent
      .post('/api/mini-scrapper')
      .send({ urls: ['https://articulo.mercadolibre.com.mx/MLM-606237538-celular-apple-iphone-6-64gb-4g-lte-_JM', 'https://www.amazon.com.mx/Apple-Desbloqueado-Unlocked-Reacondicionado-Refurbished/dp/B076JKVKD4', 'https://byprice.com/producto/1d5f0b32-6eca-4cba-bdaa-8e319710d6dd/iphone-xs-64gb-plata', 'https://doto.com.mx/xiaomi-mi-8-lite-64gb-4gb-ram-negro-medianoche.html'] })
      .set('Accept', 'application/json')
      .expect(400, {
        message: 'Some value in URL is not allowed`'
      })
  })

})
