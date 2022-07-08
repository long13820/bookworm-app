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

        $paginateValue = $request->query("paginate");
        $filterArray = $request->query('filter');
        $sortArray = $request->query("sort");
//        FILTER

        if(isset($filterArray) ){
            if (is_array($filterArray) || is_object($filterArray)) {
                $filterKey1 = array();
                $filterValue1 = array();
//            $filterKey2 = array();
                $filterValue2 = array();
                foreach ($filterArray as $key => $value) {
                    if ($key != 'avg_rating') {
                        $filterKey1[] = $key;
                        $filterValue1[] = $value;
                    } else {
//                    $filterKey2[] = $key;
                        $filterValue2[] = $value;
                    }
                }
            }
            $allbooks =  DB::table('book')
                ->join('authors', 'authors.id', '=', 'books.author_id')
                ->join('categories', 'categories.id', '=', 'books.category_id')
                ->leftJoin('reviews', 'reviews.book_id', '=', 'books.id')
                ->leftJoin('discounts', 'discounts.book_id', '=', 'books.id')
                ->selectRaw('avg(reviews.rating_star) as avg_rating')
                ->where(function ($query) use ($filterKey1, $filterValue1) {
                    foreach ($filterKey1 as $index => $value) {
                        $query->where($value, '=', $filterValue1[$index]);
                    }
                })
                ->where(function ($query) use ($filterKey1, $filterValue1) {
                    foreach ($filterKey1 as $index => $value) {
                        $query->where($value, '=', $filterValue1[$index]);
                    }
                })
                ->where('avg(reviews.rating_star)', '>=', array($filterValue2))

                ->select('books.id',
                    'books.book_title',
                    'books.book_price',
                    'books.book_cover_photo',
                    'categories.category_name',
                    'authors.author_name',
                    )
                ->selectRaw('(CASE WHEN EXISTS (select discounts.book_id from discounts where books.id=book_id)
                              THEN (select discount_price from discounts where book_id=books.id)
                              ELSE books.book_price END) as final_price')
                ->distinct('books.id')
                ->paginate($paginateValue);
        }else{
            $allbooks =  DB::table('books')
                ->join('authors', 'authors.id', '=', 'books.author_id')
                ->join('categories', 'categories.id', '=', 'books.category_id')
                ->leftJoin('reviews', 'reviews.book_id', '=', 'books.id')
                ->leftJoin('discounts', 'discounts.book_id', '=', 'books.id')


//                ->where('book_avg_rating.avg_rating', '>=', array($filterValue2))

                ->select('books.id',
                    'books.book_title',
                    'books.book_price',
                    'books.book_cover_photo',
                    'categories.category_name',
                    'authors.author_name',
                    )
                ->selectRaw('(CASE WHEN EXISTS (select discounts.book_id from discounts where books.id=book_id)
                              THEN (select discount_price from discounts where book_id=books.id)
                              ELSE books.book_price END) as final_price')
                ->distinct('books.id')
                ->paginate($paginateValue);
        }
        return $allbooks;
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
