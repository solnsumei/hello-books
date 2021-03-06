export class User{
  constructor(firstName, surname, username, email, password, admin, googleUser=false, level=null){
    this.firstName = firstName,
    this.surname = surname,
    this.username = username;
    this.email = email;
    this.password = password;
    this.admin = admin;
    this.googleUser = googleUser;
    this.level = level != null ? level : 'Free';
  }
}

export class Category{
  constructor(name, slug){
    this.name = name;
    this.slug = slug;
  }
}

export class Book{
  constructor(title, categoryId, author, description, stockQuantity, coverPic){
    this.title = title;
    this.author = author;
    this.categoryId = categoryId;
    this.description = description;
    this.stockQuantity = stockQuantity;
    this.coverPic = coverPic;
  }
}
