<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request ;

class BookRepository{
    public function getAllBooks(){
        return Book::leftjoin('author', 'author_id', '=', 'book.author_id')
            ->leftjoin('category', 'category.id', '=', 'book.category_id')
            ->leftjoin('review', 'review.book_id', '=', 'book.id')
            ->leftjoin('discount', 'discount.book_id', '=', 'book.id')

            ->select('book.id',
                'book.book_title',
                'book.book_price',
                'book.book_cover_photo',
                'category.category_name',
                'author.author_name',
                'discount.discount_price'
            )
            ->selectRaw('(CASE WHEN EXISTS (select discount.book_id from discount where book.id=book_id)
                        THEN (select discount_price from discount where book_id = book.id)
                        ELSE book.book_price END) as final_price')
            ->distinct()
            ->get();

    }
}
