#include <iostream>
#include <fstream>

using namespace std;

string concat()
{
	string long = "";
	string input;

	while (!cin.eof()){
		cin >> input;
		long += input;
	}
	return long;
}

int main()
{
	ofstream file;
	string go = concat();

	file.open("prufrock.txt");
	file << go;
	file.close();

	return 0;
}
