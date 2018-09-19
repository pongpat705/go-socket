package model

import "database/sql"

type User struct {
	UserId   int            `json:"userId"`
	Division sql.NullString `json:"division"`
	Enabled  int            `json:"enabled"`
	Name     sql.NullString `json:"name"`
	Password sql.NullString `json:"password"`
	UserName sql.NullString `json:"userName"`
}
