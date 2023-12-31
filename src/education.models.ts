
export type StudentsListViewModel = {
    id : number,
    name : string,
    visit : boolean
}

export type TeachersListViewModel = {
    id : number,
    name : string,
    visit : boolean
}

export type LessonViewModel = {
    id : number,
    date : string,
    title : string,
    status : 0 | 1,
    visitCount : number,
    students : StudentsListViewModel[],
    teachers : TeachersListViewModel[],
}

export type CreateLessonModel = {
    teacherIds : number[],
    title : string,
    days : number[],
    firstDate : string,
    lastDate : string,
    lessonsCount: number,
}


