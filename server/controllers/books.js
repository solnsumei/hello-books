import db from '../models';

export const booksController = {

    // Method to add book
    create(req, res) {
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(400).send({error : 'All fields are required!'});
        }

        return db.Book
            .create({
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                pic: req.body.pic,
                quantity: req.body.quantity,
            })
            .then(book => res.status(201).send(book))
            .catch(error => {
                if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError"){
                    res.status(400).send(error.errors);
                }else{
                    res.status(400).send(error);
                }
            });
    },


    // Method to get books from library
    index(req, res) {
        return db.Book
            .findAll({
                attributes: ['id', 'title', 'author', 'description', 'pic', 'quantity']
            })
            .then(books => res.status(200).send(books))
            .catch(error => res.status(400).send(error));
    },

    // Method to update a book
    update(req, res){
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(400).send({error : 'All fields are required!'});
        }

        if(req.params.bookId === null){
            return res.status(400).send({error : 'Book id cannot be null'});
        }

        req.checkParams('bookId', 'BookId is invalid').isNumeric();

        req.getValidationResult()
            .then(result => {
               if(!result.isEmpty()){
                   return res.status(400).send(result.array());
               }
        });

        return db.Book
            .findById(req.params.bookId)
            .then(book => {
                if(!book){
                    return res.status(404).send({error: `Book not found`});
                }
                book.update({
                    title: req.body.title,
                    author: req.body.author,
                    description: req.body.description,
                    pic: req.body.pic
                }).then(result => res.status(200).send(result))
                    .catch(error => {
                        if(error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError"){
                            res.status(400).send(error.errors);
                        }else{
                            res.status(400).send(error);
                        }
                    });

            });
    },

};