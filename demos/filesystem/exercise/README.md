# Filesystem Exercise

Write a program that reads the file sonnets.txt in this directory. The file contains Shakspeare's 154 sonnets seperated by the characters ---. Your program should seperate the sonnets into individual files and save them by number in the output directory. Use at .txt file extention with the name.

Use Node's native [Filesystem](https://nodejs.org/api/fs.html) module.

BONUS POINTS: Use the roman-numerals package from npm
to convert each file name to roman numerals. The package is
already installed in node_modules. You can view the
documentation here: https://www.npmjs.com/package/roman-numerals

HINT: In JS you can reference a linebreak with "\t"
so "some text\t" is the line "some text" followed by a linebreak
