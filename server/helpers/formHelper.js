export default {
  /**
   * Returns data for sign up form validation
   * 
   * @return {Object} with rules and customMessage
   */
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

  /**
   * Returns data for login form validation
   * 
   * @return {Object} with rules
   */
  login() {
    return {
      rules: {
        username: 'required',
        password: 'required'
      }
    };
  },

  /**
   * Returns data for update profile form validation
   * 
   * @return {Object} with rules and customMessage
   */
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

  /**
   * Returns data for change password form validation
   * 
   * @return {Object} with rules and customMessage
   */
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

  /**
   * Returns data for reset password form validation
   * 
   * @return {Object} with rules
   */
  resetPassword() {
    return {
      rules: {
        password: 'required|string|confirmed|min:8|max:150',
      }
    };
  },

  /**
   * Returns data for add book form validation
   * 
   * @return {Object} with rules and customMessage
   */
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

  /**
   * Returns data for edit book form validation
   * 
   * @return {Object} with rules and customMessage
   */
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

  /**
   * Returns data for add quantity form validation
   * 
   * @return {Object} with rules
   */
  addQuantity() {
    return {
      rules: {
        quantity: 'required|numeric|min:1'
      }
    };
  },

  /**
   * Returns data for add category form validation
   * 
   * @return {Object} with rules
   */
  addCategory() {
    return {
      rules: {
        name: 'required|string|min:2|max:30'
      }
    };
  },

  /**
   * Returns data for edit category form validation
   * 
   * @return {Object} with rules
   */
  editCategory() {
    return {
      rules: {
        name: 'string|min:2|max:30'
      }
    };
  },

  /**
   * Returns data for edit membership form validation
   * 
   * @return {Object} with rules and customMessage
   */
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

