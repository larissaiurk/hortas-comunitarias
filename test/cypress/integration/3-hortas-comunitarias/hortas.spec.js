/// <reference types="cypress" />

function fakeLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, "getCurrentPosition", (cb, err) => {
        if (latitude && longitude) {
          return cb({ coords: { latitude, longitude } });
        }
        throw err({ code: 1 }); // 1: rejected, 2: unable, 3: timeout
      });
    }
  };
}

describe('Cadastrar hortas', () => {
  it('deve realizar o cadastro da horta', () => {
    cy.visit("http://localhost:3000/create-points", fakeLocation(-25.442822, -49.268179)); // Curitiba

    cy.get('[data-cy="name"]').type('Horta Pets');
    cy.get('[data-cy="responsible"]').type('Orlando Silva');
    cy.get('[data-cy="email"]').type('orlando@email.com');
    cy.get('[data-cy="whatsapp"]').type('41992343454');

    cy.get('.dropzone')
      .attachFile('fruits.jpg', { subjectType: 'drag-n-drop' });

    // seleciona localização no mapa
    cy.get('.leaflet-container').click();

    cy.get('#uf')
      .select(['PR'])
      .invoke('val')
      .should('deep.equal', 'PR');

    cy.get('#city')
      .select(['Curitiba'])
      .invoke('val')
      .should('deep.equal', 'Curitiba');     
      
    cy.get('[data-cy="product-1"]').click()

    // routing, escutar onde estamos conectando
    // start server
    // criar rota
    // escutar rota

    cy.server()
    cy.route('POST', '**/points').as('postPoints')    
    cy.get('.button-submit').click()
    cy.wait('@postPoints').then((xhr) => {
      expect(xhr.status).be.eq(200);
    })
  });
})

describe('Editar dados da horta', () => {
  it('deve realizar o cadastro da horta', () => {
    cy.visit("http://localhost:3000/point/1", fakeLocation(-25.442822, -49.268179)); // Curitiba

    cy.get('[data-cy="btn-edit"]').click()
    cy.get('[data-cy="name"]').type('Orlando Silva EDITAR');
    cy.get('[data-cy="btn-edit-save"]').click()
  });
})

describe('Editar produtos da horta', () => {
  it('deve realizar o cadastro da horta', () => {
    cy.visit("http://localhost:3000/point/10", fakeLocation(-25.442822, -49.268179)); // Curitiba

    cy.get('[data-cy="btn-edit-products"]').click()
    cy.get('[data-cy="product-1"]').click()
    cy.get('[data-cy="product-5"]').click()

    cy.get('[data-cy="btn-edit-products-save"]').click()

  });
})