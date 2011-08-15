//----------------------------------------------------------------
function newarr( len, lower, upper ){
     var rv = [] ;
     for ( var j = 0 ; j < len ; j++ )
     rv.push( parseFloat(Math.random() * upper) ) ;
     return rv ;
}
//----------------------------------------------------------------
function swap ( arr, j, k ){
    var temp = arr[j]; arr[j] = arr[k]; arr[k] = temp; return true ;
}
//----------------------------------------------------------------
function bsort ( arr ) {
  var swapped = false ;
   do {
   for ( var j = 0 ; j < arr.length ; j++ )
   for ( var k = j+1 ; k < arr.length ; k++ ) {
       swapped = false ;
       if ( arr[j] < arr[k] ) swapped = swap( arr,j,k );     
   }
   } while( swapped ) ;
   return arr;
}
//----------------------------------------------------------------
alert(bsort( newarr(999,0,99999) ));
//----------------------------------------------------------------
/*
undefined
*/