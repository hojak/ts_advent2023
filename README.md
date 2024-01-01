# ts_advent2024
Typescript solutions my participations in the advent of code 2023
see: https://adventofcode.com/

## Links
* description of the task
    https://adventofcode.com/2023/day/1

## Steps to execute my solutions

```(bash)
nvm use
npm install
npm run build

cat data/dayX/input.txt | node out/src/ts/dayX/part1.js 
```


## ToDo

* Day 20 +
* Day 19 Part 2
* Day 18 Part 2

  The resulting floor plan is too large to fit in the memory. Even for the test input, we get a square of 1.186.328 x 1.186.328. The _real_ input results in an even larger area.
  Keeping a plan of this size completely in memory is not an option. We need to solve this problem in a dirfferent way.

  First Idea: 

  * transform the plan into a list of _dig lines_, where a dig line consists of
      
      * the start coordinates
      * the end coordinates
      * the directions entering and exiting the line

  * for each row (y coordinate), get a list of dig lines _hitting_ this row, ordered by their x coordinates
  * uses this lists in the algorithm to measure the inner area
* Day 14 Part 2 
   * The initial 3 cycles seem to work, but 1.000.000 cycles produce an offset of 1.
   * performance could be better
*  Day 12 Part 2
   * algorith is way too slow

