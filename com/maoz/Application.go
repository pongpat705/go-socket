package main

import (
	"route"
	"websocket"

	"github.com/kataras/iris"
)

func main() {
	app := route.GetRoute()

	websocket.GetSocket(app)

	// x2
	// http://localhost:8080
	// http://localhost:8080
	// write something, press submit, see the result.
	app.Run(iris.Addr(":8088"))
}
