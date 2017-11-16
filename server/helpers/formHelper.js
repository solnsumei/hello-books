export default {
  signup() {
    return {
      rules: {
        firstName: 'required|string|min:2|max:30',
        surname: 'required|string|min:2|max:30',
        username: 'required|string|min:2|max:30',
        email: 'required|email',
        password: 'required|min:8|max:255'
      },
      customMesage: {
        firstName: 'first name'
      }
    };
  },

  login() {
    return {
      rules: {
        username: 'required',
        password: 'required'
      }
    };
  },

  updateProfile() {
    return {
      rules: {
        firstName: 'string|min:2|max:30',
        surname: 'string|min:2|max:30',
      },
      customMessage: {
        firstName: 'first name',
      }
    };
  },

  changePassword() {
    return {
      rules: {
        oldPassword: 'required|string',
        password: 'required|string|min:8|max:255|confirmed',
      },
      customMesage: {
        oldPassword: 'current password'
      }
    };
  },

  addBook() {
    return {
      rules: {
        title: 'required|string|min:2|max:150',
        author: 'required|string|min:2|max:50',
        categoryId: 'required|numeric|min:1',
        stockQuantity: 'required|numeric|min:1',
        description: 'required',
        coverPic: 'required|string'
      },
      customMessage: {
        categoryId: 'category id',
        stockQuantity: 'stock quantity',
        coverPic: 'cover picture'
      }
    };
  },

  editBook() {
    return {
      rules: {
        title: 'string|min:2|max:150',
        author: 'string|min:2|max:50',
        categoryId: 'numeric|min:1',
        coverPic: 'string'
      },
      customMessage: {
        categoryId: 'category id',
        coverPic: 'cover picture'
      }
    };
  },

  addQuantity() {
    return {
      rules: {
        quantity: 'required|numeric|min:1'
      }
    };
  },

  addCategory() {
    return {
      rules: {
        name: 'required|string|min:2|max:30'
      }
    };
  },

  editCategory() {
    return {
      rules: {
        name: 'string|min:2|max:30'
      }
    };
  },

  editMembershipType() {
    return {
      rules: {
        lendDuration: 'required|integer|min:1',
        maxBorrowable: 'required|integer|min:1'
      },
      customMessage: {
        lendDuration: 'lend duration',
        maxBorrowable: 'maximum books borrowable'
      }
    };
  }

};

