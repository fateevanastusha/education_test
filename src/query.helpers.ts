
export const queryHelpers = {
    async date (date : string | undefined) {
        if(!date) return undefined
        return date.trim()
    },
    async status (status : string | undefined) : Promise<undefined | number> {
        if(!status) return undefined
        return +status
    },
    async teacherIds (teacherIds : string | undefined) {
        if(!teacherIds) return undefined
        return teacherIds.trim()
    },
    async studentsCount (studentsCount : string | undefined) {
        if(!studentsCount) return undefined
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