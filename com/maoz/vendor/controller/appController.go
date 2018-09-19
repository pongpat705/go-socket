package controller

import (
	"github.com/kataras/iris"
)

func Landing(ctx iris.Context) {
	if err := ctx.View("app.html"); err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.Writef(err.Error())
	}
}
