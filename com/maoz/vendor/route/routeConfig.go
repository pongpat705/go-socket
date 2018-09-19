package route

import (
	"controller"

	"github.com/kataras/iris"
)

func GetRoute() *iris.Application {
	app := iris.New()

	//template
	template := iris.HTML("./html", ".html")
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

	return app
}
