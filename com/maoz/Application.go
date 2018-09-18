package main

import (
	"github.com/kataras/iris"
	"github.com/pongpat705/go-socket/com/maoz/route"
	"github.com/pongpat705/go-socket/com/maoz/websocket"
	"github.com/pongpat705/go-socket/com/maoz/db"
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
