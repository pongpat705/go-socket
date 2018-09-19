package main

import (
	"db"
	"route"
	"websocket"

	"github.com/kataras/iris"
)

func main() {
	app := route.GetRoute()
	db.InitDB()
	db.DoQuery()
	db.CloseDb()
	websocket.GetSocket(app)

	// x2
	// http://localhost:8080
	// http://localhost:8080
	// write something, press submit, see the result.
	app.Run(iris.Addr(":8088"))
}
