<?php


namespace App\Repositories\Book;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class BookRepository{

    protected $books;

    public function __construct(Book $books)
    {
        $this->books = $books;
    }

    public function getAllBooks(Request $request){

        $filter = $request->query('filter');
        $sort = $request->query('sort');
        $filterValue = $request->filterValue;
        $per = $request->query('paginate');

        $books = Book::query()
            ->leftJoin('discounts', function ($join) {
                $join->on('books.id', '=', 'discounts.book_id')
                    ->whereDate('discount_start_date', '<=', now())
                    ->where(function ($query) {
                        $query->whereDate('discount_end_date', '>', now())
                            ->orWhereNull('discount_end_date');
                    });
            })
            ->join('authors', 'books.author_id', '=', 'authors.id')
            ->join('categories', 'books.category_id', '=', 'categories.id')
            ->select(
                'books.*',
                'categories.category_name',
                'authors.author_name',
                'discounts.discount_price',
                DB::raw('(CASE WHEN discount_price IS NULL THEN 0 ELSE book_price - discount_price END) as sub_price'),
                DB::raw('CASE WHEN (discounts.discount_price IS NULL) THEN books.book_price ELSE discounts.discount_price end  as final_price')
            );


        switch ($filter) {
            case "category":
                $books = $books->where('books.category_id', $filterValue);
                break;

            case "author":
                $query = $books->where('books.author_id', $filterValue);
                break;

            case "star":
                $query = $books
                    ->join('reviews', 'books.id', '=', 'reviews.book_id')
                    ->addSelect([
                        'star' => DB::raw('CAST(AVG(CAST (reviews.rating_start AS INT)) as INT)'),
                    ])
                    ->groupByRaw('books.id')
                    ->groupByRaw('authors.author_name')
                    ->groupByRaw('categories.category_name')
                    ->groupByRaw('discounts.discount_price')
                    ->havingRaw('cast(avg(CAST (reviews.rating_start AS INT)) as int) >= ?', [$filterValue]);

            default:
                break;
        }

        switch ($sort) {
            case 'popular':
                // $query = $query
                //     ->withCount('reviews')
                //     ->orderByDesc('reviews_count')
                //     ->orderBy('final_price');
                $query =  DB::table('books')
                ->join('reviews', 'books.id','=','reviews.book_id')
                ->join('authors', 'books.author_id','=','authors.id')
                ->leftJoin('discounts','books.id','=','discounts.book_id')
                ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name','books.book_price',
                DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end  as final_price'),
                DB::raw('count(books.id) as num_review'))
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
                ->orderByDesc('num_review')
                ->orderBy('final_price');
                break;

            case 'price-asc':
                $query = $query->orderBy('final_price');
                break;

            case 'price-desc':
                $query = $query->orderByDesc('final_price');
                break;

            default: // onsale is default
                $query = $query
                    ->orderByDesc('sub_price')
                    ->orderBy('final_price');
                break;
        }

        $books = $query->paginate($per);
        return response()->json($books);

}

    //Danh sách 10 sách khuyến mãi nhiều nhất

    public function getOnSaleBooks(){

        $books = DB::table('books')->join('discounts','books.id','=','discounts.book_id')
            ->join('authors', 'books.author_id','=','authors.id')
            ->select(
                'books.id',
                'books.book_cover_photo',
                'books.book_title',
                'books.book_price',
                'authors.author_name',
                'discounts.discount_price',
                DB::raw('books.book_price - discounts.discount_price as sub_price'),
                DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end as final_price')
            )
            ->where(function($query){
                $query->whereDate('discount_start_date','<=', now()->toDateString())
                      ->whereDate('discount_end_date','>=', now()->toDateString());
            })
            ->orWhere(function($query){
                $query->whereDate('discount_start_date','<=', now()-> toDateString())
                      ->whereNull('discounts.discount_end_date');
            })
            ->orderBy('sub_price','desc')
            ->take(10)
            ->get();

        return response()->json($books);

    }

     //Danh sách 8 cuốn Recommended
    public function getRecommendedBooks(){
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
    }

    //Danh sách 8 cuốn popular
    function getPopularBooks(){
        $book =  DB::table('books')
        ->join('reviews', 'books.id','=','reviews.book_id')
        ->join('authors', 'books.author_id','=','authors.id')
        ->leftJoin('discounts','books.id','=','discounts.book_id')
        ->select('books.id','books.book_cover_photo','books.book_title','authors.author_name','books.book_price',
        DB::raw('CASE WHEN (discounts.discount_price isnull) THEN books.book_price ELSE discounts.discount_price end as final_price'),
        DB::raw('count(books.id) as num_review'))
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
        ->orderByDesc('num_review')
        ->orderBy('final_price')
        ->limit(8)
        ->get();
        return response()->json($book);
    }

    //Lấy ra danh sách tên loại
    function getAllCategories(){
        $category = DB::table('categories')
        ->select('categories.id', 'categories.category_name')
        ->get();
        return response()->json($category);
    }

    //Lấy danh sách tác giả
    function getAllAuthors(){
        $author = DB::table('authors')
        ->select('authors.id', 'authors.author_name')
        ->get();
        return response()->json($author);
    }

    function getBookById($id){
        $book = DB::table('books')
       ->join('categories','books.category_id','=','categories.id')
       ->leftJoin('discounts','books.id','=','discounts.book_id')
       ->join('authors','books.author_id','=','authors.id')
       ->where('books.id','=',$id)
       ->select('books.id',
                'books.book_price',
                'books.book_title',
                'books.book_cover_photo',
                'books.book_summary',
                'authors.author_name',
                'discounts.discount_price',
                'categories.category_name')
        ->selectRaw('(CASE WHEN discounts.discount_price is null
                    THEN books.book_price
                    ELSE discounts.discount_price END) as final_price')
        ->get();
       return response()->json($book);
    }

}
