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
            ->join('authors', 'authors.id', '=', 'books.author_id')
        //    ->join('review', 'review.book_id', '=', 'book.id')
            ->select('books.*',
                'categories.category_name',
                'authors.author_name',
                'discounts.discount_price',

                )
            ->selectRaw('(CASE WHEN discounts.discount_price is null
                        THEN books.book_price
                        ELSE discounts.discount_price END)
                        AS final_price,
                         book.book_price - discount.discount_price as sub_price
                        ');
    }
    public function scopeSort($query, $request)
    {
        if ($request->has("sort")) {
            foreach ($request->query("sort") as $key => $value) {
                $sortBy = $key;
                $sortValue = $value;
            }
            if ($sortBy == "sub_price") {

                $query->orderBy($sortBy, $sortValue);
            }

            if ($sortBy == "final_price") {
                $query->orderBy($sortBy, $sortValue);
            }



        }
        return $query;
    }

    public function scopeFilter($query, $request){
        if ($request->has("filter.category_name")) {
            $categoryList = explode(",", $request->query("filter")["category_name"]);
            $query->where("category_name",'=', $categoryList);
        }
        if ($request->has("filter.author_name")) {
            $categoryList = explode(",", $request->query("filter")["author_name"]);
            $query->where("author_name",'=', $categoryList);
        }
        if ($request->has("filter.review_avg_rating_start")) {
            $categoryList = explode(",", $request->query("filter")["review_avg_rating_start"]);
            $query->where("review_avg_rating_start",'>=', $categoryList);
        }
        return $query;
    }

}
