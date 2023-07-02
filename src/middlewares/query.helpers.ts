
export const queryHelpers = {
    async date (date : string | undefined) {
        if(!date) return [null, null]
        const dataList = date.trim().split(',')
        if(!dataList[1]) return [dataList[0], ''];
        return dataList
    },
    async status (status : string | undefined) : Promise<string | null> {
        if(!status) return null;
        return status;
    },
    async teacherIds (teacherIds : string | undefined) {
        if(!teacherIds) return null
        return teacherIds.trim()
    },
    async studentsCount (studentsCount : string | undefined){
        if(!studentsCount) return [null, null]
        const countList = studentsCount.trim().split(',')
        if(!countList[1]) return [countList[0], null];
        return countList
    },
    async page (page : string | undefined) {
        if(!page) return 1
        return +page
    },
    async lessonsPerPage (lessonsPerPage : string | undefined) {
        if(!lessonsPerPage) return 10
        return +lessonsPerPage
    },

}