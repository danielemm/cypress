describe('Login e registro de usuarios alura pic', () => {
  beforeEach(() => {
    cy.visit('https://alura-fotos.herokuapp.com/')
  })

  it('verifica mensagens validacao', () => {
    cy.contains('a', 'Register now').click()
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible')
    cy.contains('ap-vmessage', 'User name is required!').should('be.visible')
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible')
  })

  it('verifica mensagens email invalido', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="email"]').type('daniele')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible')
  })

  it('verifica mensagens tamanho minimo nome', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="fullName"]').type('d')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
  })

  it('verifica mensagens tamanho maximo nome', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="fullName"]').type(
      'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
    )
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Maximun length is 40').should('be.visible')
  })

  it('verifica mensagens tamanho minimo usuario', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="userName"]').type('d')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
  })

  it('verifica mensagens tamanho maximo usuario', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="userName"]').type(
      'sssssssssssssssssssssssssssssssssssssssssss'
    )
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Maximun length is 30').should('be.visible')
  })

  it('verifica mensagens lower case', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="userName"]').type('Daniele')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Must be lower case').should('be.visible')
  })

  it('verifica usuario disponivel', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="userName"]').type('daniele')
    cy.contains('div[class="form-group"]', 'User available').should(
      'be.visible'
    )
  })

  it('verifica usuario indisponivel', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="userName"]').type('alura')
    cy.contains('ap-vmessage', 'Username already taken').should('be.visible')
  })

  it('verifica tamanho minimo senha', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="password"]').type('1234567')

    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
  })

  it('verifica tamanho maximo senha', () => {
    cy.contains('a', 'Register now').click()
    cy.get('input[formcontrolname="password"]').type('1234567890123456789')
    cy.contains('button', 'Register!').click()
    cy.contains('ap-vmessage', 'Maximun length is 18').should('be.visible')
  })

  const usuarios = require('../../fixtures/usuarios.json')
  usuarios.forEach(usuario => {
    it.only(`registra novo usuario ${usuario.userName}`, () => {
      cy.contains('a', 'Register now').click()
      cy.contains('button', 'Register').click()
      cy.get('input[formcontrolname="email"]').type(usuario.email)
      cy.get('input[formcontrolname="fullName"]').type(usuario.fullName)
      cy.get('input[formcontrolname="userName"]').type(usuario.userName)
      cy.get('input[formcontrolname="password"]').type(usuario.password)
      cy.contains('button', 'Register').click()
    })
  })
})
