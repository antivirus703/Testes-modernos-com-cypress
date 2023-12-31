const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR:'.btn',
        Func_XP_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '.col-4 > .form-control',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        Func_XP_BUSCA_ELEMENTO: ':nth-child(7) > .row > .col-12 > :nth-child(1) > span',
        Func_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        Func_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`
    },

    SALDO: {
        Func_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    },

    MESSAGE: '.toast-message',
}

export default locators;