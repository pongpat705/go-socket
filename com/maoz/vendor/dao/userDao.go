package dao

import (
	"db"
	"fmt"
	"model"
)

func GetUsers() []model.User {
	db.InitDB()
	conn := db.GetDb()
	//A result
	var resultData []model.User
	//A prepare statement

	//##################### Play Ground ####################################################
	//get transaction and Begin
	tx, err := conn.Begin()
	statement := "select * from user"
	//A result
	results, err := conn.Query(statement)
	if err != nil {
		//Rollback
		tx.Rollback()
		panic(err.Error()) // proper error handling instead of panic in your app
	} else {

		for results.Next() {

			var user model.User

			// for each row, scan the result into our tag composite object

			err = results.Scan(&user.UserId, &user.Division, &user.Enabled, &user.Name, &user.Password, &user.UserName)
			if err != nil {
				panic(err.Error()) // proper error handling instead of panic in your app
			} else {
				resultData = append(resultData, user)
				fmt.Printf("adding : " + user.UserName.String + "\n")
			}
			// and then print out the tag's Name attribute
		}
	}
	//commit it
	tx.Commit()
	//##################### Play Ground ####################################################

	defer db.CloseDb()

	return resultData
}
