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

       $size = $request->query("paginate");
       $books = Book::FeaturedBooks()
           ->sort($request)
           ->filter($request)
           ->paginate($size);
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
    //Lấy ra 1 sách với ID tương ứng
    function getBookById($id){
        $book = DB::table('book')
       ->join('category','book.category_id','=','category.id')
       ->leftJoin('discount','book.id','=','discount.book_id')
       ->join('author','book.author_id','=','author.id')
       ->where('book.id','=',$id)
       ->select('book.id',
                'book.book_price',
                'book.book_title',
                'book.book_cover_photo',
                'book.book_summary',
                'author.author_name',
                'discount.discount_price',
                'category.category_name')
        ->selectRaw('(CASE WHEN discount.discount_price is null
                    THEN book.book_price
                    ELSE discount.discount_price END) as final_price')
        ->get();
       return response()->json([
            "message" => "Get book by id: {$id} successfully",
            "data" => $book
       ],200);
    }
    }

}
