<?php


namespace App\Repositories\Book;

use App\Models\Book;

class BookRepository{
    public function getAllBooks(){
        return Book::leftjoin('author', 'author_id', '=', 'book.author_id')
            ->leftjoin('category', 'category.id', '=', 'book.category_id')
            ->leftjoin('review', 'review.book_id', '=', 'book.id')
            ->leftjoin('discount', 'discount.book_id', '=', 'book.id')

            ->select('book.id',
                'book.'

            )

    }
}
