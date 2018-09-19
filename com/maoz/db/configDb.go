package db

import(
  _ "github.com/go-sql-driver/mysql"
  "database/sql"
  "fmt"
)

var db *sql.DB

func InitDB(){
  var err error
   db, err = sql.Open("mysql", "pongpat705:d6iydc8mot@tcp(139.162.43.200:3306)/cms")

    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }
    fmt.Println("init db")
}

func DoQuery(){
  results, err := db.Query("SELECT * FROM user")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	for results.Next() {
    var userId int
    var division sql.NullString
    var enabled int
    var name sql.NullString
    var password sql.NullString
    var userName sql.NullString
		// for each row, scan the result into our tag composite object

		err = results.Scan(&userId,&division,&enabled,&name,&password,&userName)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		} else {

        fmt.Printf(name.String+"\n")

    }
                // and then print out the tag's Name attribute

	}
}

func GetDb() *sql.DB{
  fmt.Println("get db")
  return db
}

func CloseDb(){
  fmt.Println("close db")
  db.Close();
}
