var x = 10;
function y() {
    console.log("1" + x); //Prints undefined
    var x = 20;
    console.log(x); //Prints 20
}
y();
console.log(x); //Prints 10