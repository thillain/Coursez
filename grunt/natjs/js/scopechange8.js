//What is the value of x after the code below is executed?

var x = "";
function foo() {
    x += "foo ";
}
var bar = function() {
    x += "bar ";
};
foo();
var quux = bar = foo;
quux();

