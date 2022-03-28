export function GenerateStudentUsername(firstName:string, lastName:string, studentID:string) {

    //firstName: suzan lastName: kassabry studentID: 208856377 rand: 5
    // ==> username: S$suzan6377kassabry5

    const rand = Math.floor(Math.random() * 9) + 1; //random int between 1 and 9
    const id = studentID.slice(-4); //the last 4 degits from student id
    const username = `S$${firstName}${id}${lastName}${rand}`

    return username;
}

export function GenerateStudentPassword(firstName:string, studentID:string) {
    //firstName: suzan studentID: 208856377 rand1: 2 rand2: 8
    // ==> password: 28S$suzan20885
    const id = studentID.slice(5);
    const rand1 = Math.floor(Math.random() * 9) + 1;
    const rand2 = Math.floor(Math.random() * 9) + 1;
    const password = `${rand1}${rand2}S$${firstName}${id}`

    return password;
}

export function GenerateTeacherUsername(firstName:string, lastName:string, studentID:string) {

    //firstName: suzan lastName: kassabry studentID: 208856377 rand: 5
    // ==> username: T$suzan6377kassabry5

    const rand = Math.floor(Math.random() * 9) + 1; //random int between 1 and 9
    const id = studentID.slice(-4); //the last 4 degits from student id
    const username = `T$${firstName}${id}${lastName}${rand}`

    return username;
}

export function GenerateTeacherPassword(firstName:string, studentID:string) {
    //firstName: suzan studentID: 208856377 rand1: 2 rand2: 8
    // ==> password: 28T$suzan20885
    const id = studentID.slice(5);
    const rand1 = Math.floor(Math.random() * 9) + 1;
    const rand2 = Math.floor(Math.random() * 9) + 1;
    const password = `${rand1}${rand2}T$${firstName}${id}`

    return password;
}