import describe from "node:test";
import {app} from "../../index";
import request from "supertest";

describe('/course', () => {
    let res
    it('should return 10 lessons', async () => {
        res = await request(app)
            .get('/')
            .expect(200)
        expect(res.body).toStrictEqual(
            [
                {
                    "id": 1,
                    "date": "2019-08-31",
                    "title": "Green Color",
                    "status": 1,
                    "visitCount": 2,
                    "students": [
                        {
                            "student_id": 1,
                            "visit": true,
                            "name": "Ivan"
                        },
                        {
                            "student_id": 2,
                            "visit": true,
                            "name": "Sergey"
                        },
                        {
                            "student_id": 3,
                            "visit": false,
                            "name": "Maxim"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 1,
                            "name": "Sveta"
                        },
                        {
                            "id": 3,
                            "name": "Angelina"
                        }
                    ]
                },
                {
                    "id": 2,
                    "date": "2019-09-01",
                    "title": "Red Color",
                    "status": 0,
                    "visitCount": 2,
                    "students": [
                        {
                            "student_id": 2,
                            "visit": true,
                            "name": "Sergey"
                        },
                        {
                            "student_id": 3,
                            "visit": true,
                            "name": "Maxim"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 1,
                            "name": "Sveta"
                        },
                        {
                            "id": 4,
                            "name": "Masha"
                        }
                    ]
                },
                {
                    "id": 3,
                    "date": "2019-09-02",
                    "title": "Orange Color",
                    "status": 1,
                    "visitCount": 0,
                    "students": [],
                    "teachers": [
                        {
                            "id": 3,
                            "name": "Angelina"
                        }
                    ]
                },
                {
                    "id": 4,
                    "date": "2019-09-03",
                    "title": "Blue Color",
                    "status": 1,
                    "visitCount": 4,
                    "students": [
                        {
                            "student_id": 1,
                            "visit": true,
                            "name": "Ivan"
                        },
                        {
                            "student_id": 2,
                            "visit": true,
                            "name": "Sergey"
                        },
                        {
                            "student_id": 3,
                            "visit": true,
                            "name": "Maxim"
                        },
                        {
                            "student_id": 4,
                            "visit": true,
                            "name": "Slava"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 4,
                            "name": "Masha"
                        }
                    ]
                },
                {
                    "id": 5,
                    "date": "2019-05-09",
                    "title": "Purple Color",
                    "status": 0,
                    "visitCount": 0,
                    "students": [
                        {
                            "student_id": 4,
                            "visit": false,
                            "name": "Slava"
                        },
                        {
                            "student_id": 2,
                            "visit": false,
                            "name": "Sergey"
                        }
                    ],
                    "teachers": []
                },
                {
                    "id": 6,
                    "date": "2019-05-14",
                    "title": "Red Color",
                    "status": 1,
                    "visitCount": 0,
                    "students": [
                        {
                            "student_id": 1,
                            "visit": false,
                            "name": "Ivan"
                        },
                        {
                            "student_id": 3,
                            "visit": false,
                            "name": "Maxim"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 3,
                            "name": "Angelina"
                        }
                    ]
                },
                {
                    "id": 7,
                    "date": "2019-06-16",
                    "title": "White Color",
                    "status": 0,
                    "visitCount": 2,
                    "students": [
                        {
                            "student_id": 2,
                            "visit": true,
                            "name": "Sergey"
                        },
                        {
                            "student_id": 1,
                            "visit": true,
                            "name": "Ivan"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 1,
                            "name": "Sveta"
                        }
                    ]
                },
                {
                    "id": 8,
                    "date": "2019-06-16",
                    "title": "Black Color",
                    "status": 1,
                    "visitCount": 2,
                    "students": [
                        {
                            "student_id": 1,
                            "visit": false,
                            "name": "Ivan"
                        },
                        {
                            "student_id": 4,
                            "visit": true,
                            "name": "Slava"
                        },
                        {
                            "student_id": 2,
                            "visit": true,
                            "name": "Sergey"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 4,
                            "name": "Masha"
                        },
                        {
                            "id": 3,
                            "name": "Angelina"
                        },
                        {
                            "id": 2,
                            "name": "Marina"
                        }
                    ]
                },
                {
                    "id": 9,
                    "date": "2019-06-19",
                    "title": "Yellow Color",
                    "status": 1,
                    "visitCount": 0,
                    "students": [
                        {
                            "student_id": 2,
                            "visit": false,
                            "name": "Sergey"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 3,
                            "name": "Angelina"
                        }
                    ]
                },
                {
                    "id": 10,
                    "date": "2019-06-23",
                    "title": "Brown Color",
                    "status": 0,
                    "visitCount": 1,
                    "students": [
                        {
                            "student_id": 1,
                            "visit": false,
                            "name": "Ivan"
                        },
                        {
                            "student_id": 3,
                            "visit": true,
                            "name": "Maxim"
                        }
                    ],
                    "teachers": [
                        {
                            "id": 3,
                            "name": "Angelina"
                        }
                    ]
                }
            ]
        )
    })

    it('should return 1 lesson', async () => {
        res = await request(app)
            .get('/?date=2019-09-01,2023-01-05&status=1&studentsCount=0,3&page=2&lessonsPerPage=1')
            .expect(200)
        expect(res.body).toStrictEqual([{
            "id": 3,
            "date": "2019-09-02",
            "title": "Orange Color",
            "status": 1,
            "visitCount": 0,
            "students": [],
            "teachers": [
                {
                    "id": 3,
                    "name": "Angelina"
                }
            ]
        }])
    })

    it('should get errors', async () => {
        res = await request(app)
            .post('/lessons')
            .send({
                "teacherIds": [1, "4"],
                "title": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "days": 'alallaa',
                "firstDate": "nodate",
                "lessonsCount": 'sssssss'
            })
            .expect(400)
        expect(res.body).toStrictEqual({
            "errorsMessages": [
                {
                    "type": "field",
                    "value": [
                        1,
                        "4"
                    ],
                    "msg": "array must contain numbers",
                    "path": "teacherIds",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                    "msg": "Invalid value",
                    "path": "title",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": "alallaa",
                    "msg": "Invalid value",
                    "path": "days",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": "nodate",
                    "msg": "must be date",
                    "path": "firstDate",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": "sssssss",
                    "msg": "Invalid value",
                    "path": "lessonsCount",
                    "location": "body"
                }
            ]
        })
    })
    it('should create 10 lessons', async () => {
        res = await request(app)
            .post('/lessons')
            .send({
                "teacherIds": [1,3],
                "title": "Blue Ocean",
                "days": [0,5],
                "firstDate": "2020-12-02",
                "lessonsCount": 10
            })
            .expect(200)
        expect(res.body).toStrictEqual([
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
        ])
    })
    it('get created lessons', async () => {
        res = await request(app).get('?page=2').expect(200)
            expect(res.body.length).toBe(10)
    })
})