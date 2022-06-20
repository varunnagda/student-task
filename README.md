# Student Result Express Postgres app
base url http://localhost:8080/

**features**
- ADD Student
- Import
-  View Result
- Passed or failed student list


## api url and response:-

- ADD Student
``` http://localhost:8080/students/add ```
```{
	"name":"varun",
	"age":23,
	"mark1":20,
	"mark2":49,
	"mark3":100
}
{
    "message": "student successfully added."
}
```
- Import Student
```http://localhost:8080/students/upload```
``` upload file using form data
{
    "message": "All student successfully added."
}
```
- View Result
```http://localhost:8080/students/1/result```
``` GET  type```
```{
    "id": 1,
    "name": "varun",
    "age": 25,
    "mark1": 100,
    "mark2": 99,
    "mark3": 99,
    "createdAt": "2022-06-15T06:38:32.721Z",
    "updatedAt": "2022-06-15T06:38:32.721Z"
}
```
- Passed or failed student list
```http://localhost:8080/students?resultStatus=failed```
``` GET  type```
```[
    {
        "id": 3,
        "name": varun",
        "age": 23,
        "mark1": 20,
        "mark2": 49,
        "mark3": 100,
        "createdAt": "2022-06-15T10:08:16.137Z",
        "updatedAt": "2022-06-15T10:08:16.137Z"
    }
]
```

## React App using redux saga

```app is incomplete but i created basic structure and ui files.```

