package route

import (
	"controller"

	"github.com/kataras/iris"
)

func GetRoute() *iris.Application {
	app := iris.New()

	//static
	app.StaticServe("./static", "/static")

	//template
	template := iris.HTML("./template", ".html")
	//Layout
	template.Layout("layout.html")
	//function
	template.AddFunc("greet", func(s string) string {
		return "Greeting " + s + "!"
	})

	//RegisterView
	app.RegisterView(template)

	//define route
	app.Get("/app", controller.Landing)
	app.Get("/users", controller.LoadUsers)
	app.Get("/users.json", controller.LoadUsersWithJson)

	return app
}
