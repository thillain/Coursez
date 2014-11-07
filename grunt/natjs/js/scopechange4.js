var foo  = 'Global';
function fun() {
    log( foo );
    var foo = 'Local';
    log( foo );
}
fun();