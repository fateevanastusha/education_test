
export const queryHelpers = {
    async date (date : string | undefined) {
        if(!date) return date
        return date.trim()
    },
    async status (status : string | undefined) {
        if(!status) return status
        return +status
    },
    async teacherIds (teacherIds : string | undefined) {
        if(!teacherIds) return teacherIds
        return teacherIds.trim()
    },
    async studentsCount (studentsCount : string | undefined) {
        if(!studentsCount) return studentsCount
        return studentsCount.trim()
    },
    async page (page : string | undefined) {
        if(!page) return 1
        return +page
    },
    async lessonsPerPage (lessonsPerPage : string | undefined) {
        if(!lessonsPerPage) return 1
        return +lessonsPerPage
    },

}