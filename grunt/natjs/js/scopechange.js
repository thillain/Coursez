// Scope change
var a="old value"
function changethevalueofA(){
	a = "new value";
	return;
	function a(){}
}
changethevalueofA();
console.log(a);