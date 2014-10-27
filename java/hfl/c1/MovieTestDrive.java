class MovieTestDrive{
public static void main(String[] args){
Movie one = new Movie();
one.title = "Gone with the stock";
one.genre = "Tragic";
one.rating = -2;
one.playit();
Movie two = new Movie();
two.title = "Gone with the stock";
two.genre = "Comedy";
two.rating = 5;
two.playit();
Movie three = new Movie();
three.title = "Byte with the stock";
three.genre = "Tragic";
three.rating = 127;
three.playit();
}
}