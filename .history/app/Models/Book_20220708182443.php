<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kirschbaum\PowerJoins\PowerJoins;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'books';


    function category(){
        return $this->belongsTo(Category::class);
    }

    function author(){
        return $this->belongsTo(Author::class);
    }

    function discount(){
        return $this->hasOne(Discount::class);
    }

    function reviews(){
        return $this->hasMany(Review::class);
    }

    public function scopeFeaturedBooks(){
        return Book::join('categories', 'books.category_id', '=', 'categories.id')
            ->join('discounts', 'discounts.book_id', '=', 'books.id' )
            ->join('authors', 'authors.id', '=', 'book.author_id')
        //    ->join('review', 'review.book_id', '=', 'book.id')
            ->select('book.*',
                'category.category_name',
                'author.author_name',
                'discount.discount_price',

                )
            ->selectRaw('(CASE WHEN discount.discount_price is null
                        THEN book.book_price
                        ELSE discount.discount_price END)
                        AS final_price,
                         book.book_price - discount.discount_price as sub_price
                        ');
    }
}
