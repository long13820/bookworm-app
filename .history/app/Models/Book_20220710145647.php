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
        $book = DB::table('books')
        ->join('reviews', 'books.id','=','reviews.book_id')
        ->join('authors', 'books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name','books.book_price',
        DB::raw('sum(cast(reviews.rating_star as integer))/count(*) as avg_rating'),
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'))
        ->where(function($query) {
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereDate('discount_end_date','>=', now()->toDateString());
        })
        ->orWhere(function($query){
            $query->whereDate('discount_start_date','<=', now()->toDateString())
                  ->whereNull('discounts.discount_end_date');
        })
        ->groupBy('final_price')
        ->groupBy('books.id')
        ->groupBy('authors.author_name')
        ->orderByDesc('avg_rating')
        ->orderBy('final_price')
        ->limit(8)
        ->get();
        return response()->json($book);
        // return Book::join('categories', 'books.category_id', '=', 'categories.id')
        //     ->join('discounts', 'discounts.book_id', '=', 'books.id' )
        //     ->join('authors', 'authors.id', '=', 'books.author_id')
        // //    ->join('review', 'review.book_id', '=', 'book.id')
        //     ->select('books.*',
        //         'categories.category_name',
        //         'authors.author_name',
        //         'discounts.discount_price',
        //         DB::raw('avg(CAST (rating_star AS FLOAT)) as avg_rating')
        //         )
        //     ->selectRaw('(CASE WHEN discounts.discount_price is null
        //                 THEN books.book_price
        //                 ELSE discounts.discount_price END)
        //                 AS final_price,
        //                  books.book_price - discounts.discount_price as sub_price
        //                 ')
        //     ->addSelect([
        //                     'avg_rating'=>Review::averageStar()
        //                     ->whereColumn('book_id','books.id')
        //     ]);
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
        if ($request->has("filter.avg_rating")) {
            $categoryList = explode(",", $request->query("filter")["avg_rating"]);
            $query->where("avg_rating",'>=', $categoryList);
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
