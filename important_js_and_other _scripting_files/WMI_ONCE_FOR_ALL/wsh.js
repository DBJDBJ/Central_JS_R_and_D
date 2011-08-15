//-------------------------------------------------------------------------------------------
var global_prop_counter = 0
var ad_sema = null ;
//-------------------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------------------
function print_buffer_flush(){	WScript.Echo( print_buffer_ ) ;}
function print( msg_ ) { print_buffer_ += "\n" + msg_ ; }
var print_buffer_ = (new Date()).toLocaleString();
//-------------------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------------------
main();
//-------------------------------------------------------------------------------------------
//
//-------------------------------------------------------------------------------------------
function main ()
{
var adOBJ = GetObject("WinNT://./admin,user");
 ad_sema = GetObject(adOBJ.Schema);
		//print("Props of adOBJ") ;
		//base_props( adOBJ ) ;
		print("Attributes of " + adOBJ.AdsPath + " Schema") ;
		//base_props( ad_sema ) ;
			print("Mandatory attributes:") ;
			foreach ( ad_sema.MandatoryProperties, enumProperties )
				print( "\nOptional attributes:" );
				foreach ( ad_sema.OptionalProperties, enumProperties )
	print_buffer_flush() ;
}
//-------------------------------------------------------------------------------------------
function enumProperties (	strAttribute , x  )
{
	global_prop_counter += 1
	print( global_prop_counter + "\t" + strAttribute );
	try {
		var objAttribute = ad_sema.GetObject("Property",  strAttribute)
		print( " (Syntax: " + objAttribute.Syntax + ")")
		print( objAttribute.MultiValued ? " Multivalued" : " Single-valued" );
	} catch (x) {
		print( x.message ) ;
	}
}
//-------------------------------------------------------------------------------------------
function base_props ( ad_object, x )
{
	try {
		print(
			"\nBase Properties : " +
			"\nName\t:\t" + ad_object.Name + 
			"\nClass\t:\t" + ad_object.Class + 
			"\nAD Path\t:\t" + ad_object.AdsPath
			) ;
	} catch ( x) {
		print( "EXCEPTION\n" + x.message ) ;
	}
}
//-------------------------------------------------------------------------------------------
function foreach ( collection, FP, x )
{
	function try_call ( FP , arg, x )
	{
		try {
				FP(arg) ;
		} catch (x) {
			var f_name = FP.toString().substring( 0, FP.toString().indexOf("(") ) ;
			print("Call to " + f_name + "(" + arg + " : " + typeof(arg) + " )" + "\nResulted in EXCEPTION :\t" + x.message ) ;
		}
	}
	
	try {
		if ( "undefined" != typeof( collection.toArray) )
		{
			var arr = collection.toArray() ;
			for ( var j = 0 ; j < arr.length; j++ )
			{
				
				try_call( FP, arr[j] ) ;
			}
		}
		else {
			for ( var E = new Enumerator(collection) ; ! E.atEnd() ; E.moveNext() )	{
					try_call( FP, E.item() ) ;
			}
		}
	} catch ( x) {
		print( "EXCEPTION\n" + x.message ) ;
		try {
			if ( (collection != null) && (typeof(collection.constructor) != "undefined" ))
				print( "\nCollection argument is\t:\t" + collection.constructor ) ;
			else	
			print( "\nCollection argument is\t:\tNULL") ;
		}catch (x) {}
	}
}
//-------------------------------------------------------------------------------------------
// 
//-------------------------------------------------------------------------------------------
