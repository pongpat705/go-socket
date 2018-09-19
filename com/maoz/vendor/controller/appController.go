package controller

import (
	"container/list"
	"db"

	"github.com/kataras/iris"
)

func Landing(ctx iris.Context) {
	if err := ctx.View("app.html"); err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Writef(err.Error())
	}
}

func LoadUsers(ctx iris.Context) {
	db.InitDB()
	var statement string
	statement = "select * from user"
	var resultData list.List
	resultData = db.DoQuery(statement)
	//close on end of method
	defer db.CloseDb()

	//prepare data
	ctx.ViewData("userList", resultData)

	if err := ctx.View("users.html"); err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Writef(err.Error())
	}

}
