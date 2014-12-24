// JavaScript Objects

var jim={
	name:"Jim",
	skills: ["JavaScript","Ruby","Dancing"],
	"favcolor": "green",
	greet: function(){
		console.log("Hello i am "+ this.name);

	}
};

var nick={
	name:"Nick",
	greet: jim.greet
};

jim.name="Thanuja";
jim.greet();
nick.greet();