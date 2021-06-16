# 1. Run server

node server.js

# 2. Search a Nobel prize winner by name

method:GET
url: http://localhost:5000/search-by-name?name=arthur

# 3. Find out Nobel prize winner in a year input by him

method: GET
url: http://localhost:5000/nobal-prize-by-year?year=2018

# 4. Search Prize winner based on the year and category (Peace/Chemistry/Physics etc...)

method: GET
url: http://localhost:5000/nobal-prize-by-year-and-category?year=2016&category=physics

# 5. Show a list of all Winners in Alphabetical order (With year and category against the name)

method:GET
url: http://localhost:5000/sorting-by-name
