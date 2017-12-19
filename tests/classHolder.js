/**
 * User class
 * 
 * @export User
 * @class User
 */
export class User {
  /**
   * Creates an instance of User.
   * @param {string} firstName 
   * @param {string} surname 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   * @param {string} admin 
   * @param {boolean} [googleUser=false] 
   * @param {string} [level=null] 
   * @memberof User
   */
  constructor(firstName, surname, username, email, password, admin, googleUser = false, level = null) {
    this.firstName = firstName;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.googleUser = googleUser;
    this.level = level != null ? level : 'Free';
  }
}

/**
 * Category class
 * 
 * @export
 * @class Category
 */
export class Category {
  /**
   * Creates an instance of Category.
   * @param {string} name 
   * @param {string} slug 
   * @memberof Category
   */
  constructor(name, slug) {
    this.name = name;
    this.slug = slug;
  }
}

/**
 * Book class
 * 
 * @export Book
 * @class Book
 */
export class Book {
  /**
   * Creates an instance of Book.
   * @param {string} title 
   * @param {number} categoryId 
   * @param {string} author 
   * @param {string} description 
   * @param {number} stockQuantity 
   * @param {string} coverPic 
   * @memberof Book
   */
  constructor(title, categoryId, author, description, stockQuantity, coverPic) {
    this.title = title;
    this.author = author;
    this.categoryId = categoryId;
    this.description = description;
    this.stockQuantity = stockQuantity;
    this.coverPic = coverPic;
  }
}
