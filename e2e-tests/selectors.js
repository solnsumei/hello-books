module.exports = {
  registerPage: {
    usernameLabel: 'div.card - content > div:nth-child(3) > div > label',
    emailLabel: 'div.card-content > div:nth-child(5) > div > label'
  },
  profilePage: {
    editBtn: 'div.card-action > div > button',
    editFormTitle: 'form > div > div > h3',
    saveButton: 'form > div > div > p > button',
    h3Title: 'h3.user-details'
  },
  sideLinks: {
    catalog: '#slide-out > div > div > div > li:first-child > a',
    dashboard: '#slide-out > div > div > div > li:nth-child(1) > a',
    category: '#slide-out > div > div > div > li:nth-child(3) > a',
    book: '#slide-out > div > div > div > li:nth-child(4) > a',
  },
  dashboardPage: {
    h3: '#app > div > main > div > div:nth-child(1) > div > h3'
  },

  catalogPage: {
    h3: '#app > div > main > div > div:nth-child(1) > div > h3',
    firstBookImg: '#app > div > main > div > div:nth-child(2) > div > div.card.horizontal > div.card-image > a > img',
    firstBookTitle: '#app > div > main > div > div:nth-child(2) > div > div.card.horizontal > div.card-stacked > div.card-content > h4'
  },

  bookDetailPage: {
    bookTitle: '#app > div > main > div > div > div.col.s12.m5 > h3',
    modalTitle: '#modal1 > div.modal-content.black-text > h4',
    modalText: '#modal1 > div.modal-content.black-text > p',
    actionBtn: '#app > div > main > div > div > div.col.s12.m3 > button',
    modalConfirmBtn: '#modal1 > div.modal-footer > button:nth-child(2)'
  },

  borrowHistory: {
    firstRowTitle: '#app > div > main > div > div.row > div > div > div > table > tbody > tr:first-child > td:nth-child(1) > a',
    returnBtn: '#app > div > main > div > div.row > div > div > div > table > tbody > tr:first-child > td:nth-child(6) > button',
    modalConfirmBtn: '#modal1 > div.modal-footer > button:nth-child(2)',
    modalTitle: '#modal1 > div.modal-content.black-text > h4',
    modalText: '#modal1 > div.modal-content.black-text > p',
    returnTd: '#app > div > main > div > div.row > div > div > div > table > tbody > tr > td:nth-child(4)'
  },

  categoryPage: {
    h4: '#category-modal > form > div.modal-content > h4',
    label: '#category-modal > form > div.modal-content > div > div > label',
    rowTd: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr > td',
    row1Name: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr:first-child > td:first-child',
    row2Name: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr:nth-child(2) > td:first-child',
    deleteModalTitle: '#modal1 > div.modal-content.black-text > h4',
    deleteModalText: '#modal1 > div.modal-content.black-text > p',
    deleteButton: '#modal1 > div.modal-footer > button:nth-child(2)'
  },
  bookPage: {
    title: '#app > div > main > div > div > div > form > div > h4',
    rowTd: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr > td',
    row1Title: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr:first-child > td:first-child',
    row1Author: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr:first-child > td:nth-child(3)',
    row1Category: '#app > div > main > div > div.row > div > div.card > div > table > tbody > tr:first-child > td:nth-child(2)',
    deleteModalTitle: '#modal1 > div.modal-content.black-text > h4',
    deleteModalText: '#modal1 > div.modal-content.black-text > p',
    deleteButton: '#modal1 > div.modal-footer > button:nth-child(2)',
    cloudinary_upload: '#cloudinary-widget > div.panel.local.active > div > div > div > input',
    uploadBtn: '#app > div > main > div > div > div > form > div > div:nth-child(7) > div.col.s6.m6 > button',
    editBtn: '#app > div > main > div > div > div > div.card > div > table > tbody > tr:first-child > td:nth-child(7) > a',
  }
};
