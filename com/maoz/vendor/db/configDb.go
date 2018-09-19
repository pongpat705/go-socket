package db

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func InitDB() {
	var err error
	db, err = sql.Open("mysql", "pongpat705:d6iydc8mot@tcp(139.162.43.200:3306)/cms")

	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("init db")
}

func GetDb() *sql.DB {
	fmt.Println("get db")
	return db
}

func CloseDb() {
	fmt.Println("close db")
	db.Close()
}
