<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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
            // ->join('reviews', 'reviews.book_id', '=', 'books.id')
            ->select('books.*',
                'categories.category_name',
                'authors.author_name',
                'discounts.discount_price',
                )
            ->selectRaw('(CASE WHEN discounts.discount_price is null
                        THEN books.book_price
                        ELSE discounts.discount_price END)
                        AS final_price,
                         books.book_price - discounts.discount_price as sub_price,
                         count(reviews.book_id) as total_review,

                        ')
            // ->groupBy('books.id','categories.category_name','authors.author_name','discounts.discount_price','sub_price');

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
        if ($request->has("filter.rating_star")) {
            $categoryList = explode(",", $request->query("filter")["rating_star"]);
            $query->where("rating_star",'>=', $categoryList);
        }
        return $query;
    }
    public function scopeSelectSubPrice($query)
    {
        return $query
            ->whereHas('discounts',function($query){
                $query->validDate();
            })
            ->addSelect([
                'sub_price' => Discount::select(DB::raw('books.book_price - discount_price'))
                    ->whereColumn('book_id', 'books.id')
            ]);
    }


    public function scopeSelectFinalPrice($query)
    {
        return $query->selectRaw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price')
            ->leftJoin('discounts', function ($join) {
                $join->on('books.id', '=', 'discounts.book_id')
                    ->where(function($query){
                        $query->where(function($query){
                            $query->whereDate('discount_start_date', '<=', now())
                                         ->whereDate('discount_end_date','>=',now());
                         })
                         ->orWhere(function ($query) {
                          $query->whereDate('discount_start_date', '<=', now())
                                 ->WhereNull('discount_end_date');
                         });
                    });
            });
    }
}
