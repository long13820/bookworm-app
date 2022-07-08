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
    if (is_array($filterArray) || is_object($filterArray)) {
        $filter1Key = array();
        $filter1Value = array();
        $filter2Key = array();
        $filter2Value = array();
        foreach ($filterArray as $key => $value) {
            if ($key != 'avg_star') {
                $filter1Key[] = $key;
                $filter1Value[] = $value;
            } else {
                $filter2Key[] = $key;
                $filter2Value[] = $value;
            }
        }
    }
    foreach ($sortArray as $key => $value) {
        $sortKey = $key;
        $sortValue = $value;
    }

    switch ($sortValue) {
        case ('onSale'):
            if ($request->has("filter")) {
                if ($filter2Value != null)
                    $books = BookRepository::getOnSaleBooks()
                        ->join('reviews', 'books.id', '=', 'reviews.book_id')
                        ->selectRaw('avg(reviews.rating_star) as avg_star')
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->havingRaw('avg(reviews.rating_star) >= ?', array($filter2Value))
                        ->orderByDesc('reduced_price')
                        ->paginate($paginateValue);
                else {
                    $books = BookRepository::getOnSaleBooks()
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->orderByDesc('reduced_price')
                        ->paginate($paginateValue);
                }
                return $books;
            } else {
                $books = BookRepository::getOnSaleBooks()
                    ->orderByDesc('reduced_price')
                    ->paginate($paginateValue);
                return $books;
            }
            break;
        case ('popularity'):
            if ($request->has("filter")) {
                if ($filter2Value != null) {
                    $books = BookRepository::getPopularBooks()
                        ->selectRaw('avg(reviews.rating_star) as avg_star')
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->havingRaw('avg(reviews.rating_star) >= ?', array($filter2Value))
                        ->orderByDesc('total_review')
                        ->orderBy('final_price')
                        ->paginate($paginateValue);
                } else {
                    $books = BookRepository::getPopularBooks()
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->orderByDesc('total_review')
                        ->orderBy('final_price')
                        ->paginate($paginateValue);
                }
                return $books;
            } else {
                $books = BookRepository::getPopularBooks()
                    ->orderByDesc('total_review')
                    ->orderBy('final_price')
                    ->paginate($paginateValue);
                return $books;
            }
            break;
        case ('priceAsc'):
            if ($request->has("filter")) {
                if ($filter2Value != null) {
                    $books = BookRepository::getRecommendedBooks()
                        ->selectRaw('avg(reviews.rating_star) as avg_star')
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->havingRaw('avg(review.rating_star) >= ?', array($filter2Value))
                        ->orderBy('final_price')
                        ->paginate($paginateValue);
                } else {
                    $books = Book::Books()
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->orderBy('final_price')
                        ->paginate($paginateValue);
                }
                return $books;
            } else {
                $books = Book::Books()
                    ->orderBy('final_price')
                    ->paginate($paginateValue);

                return $books;
            }
            break;
        case ('priceDesc'):
            if ($request->has("filter")) {
                if ($filter2Value != null) {
                    $books = BookRepository::getFeaturedBooks()
                        ->selectRaw('avg(review.rating_start) as avg_star')
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->havingRaw('avg(review.rating_start) >= ?', array($filter2Value))
                        ->orderByDesc('final_price')
                        ->paginate($paginateValue);
                } else {
                    $books = Book::Books()
                        ->where(function ($q) use ($filter1Key, $filter1Value) {
                            foreach ($filter1Key as $index => $value) {
                                $q->where($value, '=', $filter1Value[$index]);
                            }
                        })
                        ->orderByDesc('final_price')
                        ->paginate($paginateValue);
                }
                return $books;
            } else {
                $books = Book::Books()
                    ->orderByDesc('final_price')
                    ->paginate($paginateValue);

                return $books;
            }
            break;

        default:
            $msg = 'Something went wrong.';
    }
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
