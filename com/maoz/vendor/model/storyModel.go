package model

import (
	"database/sql"
	"time"
)

type Story struct {
	Id          int            `json:"id"`
	Title       sql.NullString `json:"title"`
	Content     sql.NullString `json:"content"`
	Active      sql.NullString `json:"active"`
	CreatedDate time.Time      `json:"createdDate"`
	CreatedBy   sql.NullString `json:"createdBy"`
	UpdatedDate time.Time      `json:"createdDate"`
	UpdatedBy   sql.NullString `json:"createdBy"`
}
