package controller

import (
	"dao"
	"model"

	"github.com/kataras/iris"
)

func Landing(ctx iris.Context) {
	if err := ctx.View("app.html"); err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Writef(err.Error())
	}
}

func LoadUsers(ctx iris.Context) {

	var resultData []model.User
	resultData = dao.GetUsers()
	jsonByte := iris.Map{"data": resultData}

	//prepare data
	ctx.ViewData("userList", resultData)
	ctx.ViewData("userListJson", jsonByte)
	if err := ctx.View("users.html"); err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Writef(err.Error())
	}

}

func LoadStorys(ctx iris.Context) {

	var resultData []model.Story
	resultData = dao.GetStorys()

	//prepare data
	ctx.ViewData("storyList", resultData)
	if err := ctx.View("story.html"); err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Writef(err.Error())
	}

}

func LoadUsersWithJson(ctx iris.Context) {

	var resultData []model.User
	resultData = dao.GetUsers()

	//prepare data

	ctx.JSON(iris.Map{"result": resultData, "lenght": len(resultData)})

}
