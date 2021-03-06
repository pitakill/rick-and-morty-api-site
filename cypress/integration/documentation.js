/* global it describe cy before expect*/
import config from "../../config/siteConfig"

const libraries = [
  { link: 'https://github.com/arthurdenner/rick-and-morty-graphql-api', author: 'https://github.com/arthurdenner' },
  { link: 'https://github.com/spielhoelle/rick-and-morty-gem', author: 'https://github.com/spielhoelle' },
  { link: 'https://github.com/l1h3r/ex_shla', author: 'https://github.com/l1h3r' },
  { link: 'https://github.com/afuh/rick-and-morty-api-node', author: 'https://github.com/afuh' },
  { link: 'https://github.com/curiousrohan/ramapi', author: 'https://github.com/curiousrohan' },
  { link: 'https://github.com/Carlj28/RickAndMorty.Net.Api', author: 'https://github.com/Carlj28' }
]

describe("Documentation page", () => {
  before(() => {
    cy.visit('/documentation')

    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for (let registration of registrations) {
          registration.unregister()
        }
      })

    cy.scrollTo('top')
  })

  describe("Sidebar", () => {
    it("Should hide according to the viewport size", () => {
      cy.get('aside').should('be.visible')

      cy.viewport(890, 900)
      cy.get('aside').should('not.be.visible')
      cy.wait(500)
      cy.viewport('iphone-5')
      cy.get('aside').should('not.be.visible')
      cy.wait(500)

    })

    it("Should become a sticky sidebar when scrolling", () => {
      cy.get('aside').should('have.css', 'position').and('match', /relative/)
      cy.scrollTo('center')
      cy.get('aside').should('have.css', 'position').and('match', /fixed/)
    })

    it("Should become a scrolleable sidebar", () => {
      cy.viewport(1200, 600)
      cy.scrollTo('bottom')
      cy.get('aside').scrollTo('bottom')
      cy.wait(500)
      cy.get('aside').scrollTo('top')
    })

  })

  describe('Libraries section', () => {
    it("Should have a Title and two working links", () => {
      cy.get('article').within(() => {

        libraries.forEach(library => {
          cy.get(`a[href='${library.link}']`)
            .request(library.link)
            .then(res => expect(res.status).not.to.eq(400))

          cy.get(`a[href='${library.author}']`)
            .request(library.author)
            .then(res => expect(res.status).not.to.eq(400))

        })
      })
    })
  })

  describe('Github edit page button', () => {
    it("Should be a link to edit the page", () => {
      cy.get('a.edit-page').should('have.attr', 'href', config.github.site + '/blob/develop/src/pages/documentation.md')
    })
  })

  describe('Page', () => {
    it("Should work in differents viewports", () => {
      cy.scrollTo('top')
      cy.viewport('ipad-2')
      cy.wait(400)
      cy.viewport('ipad-mini')
      cy.wait(400)
      cy.viewport('iphone-6+')
      cy.wait(400)
      cy.viewport('iphone-6')
      cy.wait(400)
      cy.viewport('iphone-5')
      cy.wait(400)
      cy.viewport('iphone-4')
      cy.wait(400)
      cy.viewport('iphone-3')
      cy.wait(400)
    })
  })

})
