package dao

import (
	"db"
	"fmt"
	"model"
)

func GetStorys() []model.Story {
	db.InitDB()
	conn := db.GetDb()
	//A result
	var resultData []model.Story
	//A prepare statement

	//##################### Play Ground ####################################################
	//get transaction and Begin
	tx, err := conn.Begin()
	statement := "select * from story where active = 'Y' "
	//A result
	results, err := conn.Query(statement)
	if err != nil {
		//Rollback
		tx.Rollback()
		panic(err.Error()) // proper error handling instead of panic in your app
	} else {

		for results.Next() {

			var story model.Story

			// for each row, scan the result into our tag composite object

			err = results.Scan(&story.Id, &story.Title, &story.Content, &story.Active, &story.CreatedDate, &story.CreatedBy, &story.UpdatedDate, &story.UpdatedBy)
			if err != nil {
				panic(err.Error()) // proper error handling instead of panic in your app
			} else {
				resultData = append(resultData, story)
				fmt.Printf("adding : " + story.Title.String + "\n")
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
