
/* eslint-disable no-console */
require('chai').should()
function timeout(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
describe('test suite', () => {
    let firstTime = true
    beforeEach(async () => {
        page = await global.browser.newPage()
        await page.goto('http://localhost:3000')
        if (firstTime) {
          firstTime = false
          await global.metamask.confirmTransaction() // connect
        }
        await page.bringToFront()
        await page.reload()
    })

    afterEach(async () => {
        await page.close()
    })

    it('test', async () => {
        await timeout(2000)
        const button = await page.$('.button')
        await button.click()
        await global.metamask.confirmTransaction()
        await page.bringToFront()
    })
})